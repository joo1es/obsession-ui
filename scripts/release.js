#!/usr/bin/env node
/**
 * 一键发版脚本（配合 .github/workflows/release.yml 的 Trusted Publishing）。
 *
 * 用法：
 *   yarn release:tag patch        # 1.2.0 -> 1.2.1
 *   yarn release:tag minor        # 1.2.0 -> 1.3.0
 *   yarn release:tag major        # 1.2.0 -> 2.0.0
 *   yarn release:tag 1.5.3        # 直接指定目标版本
 *
 * 做的事：
 *   1. 用 npm 的 semver 规则同步更新 package.json 的 version（核心：tag 必须与之一致）
 *   2. 提交 package.json 的改动
 *   3. 打 vX.Y.Z tag
 *   4. 推送 commit + tag —— 推送 tag 会触发 GitHub Actions 自动构建 + 发 npm + 部署文档站
 *
 * 注意：需要本地已安装 git 且 npm 在 PATH 中。
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const cwd = process.cwd()
const pkgPath = path.join(cwd, 'package.json')

function run(cmd) {
  return execSync(cmd, { cwd, stdio: 'inherit' })
}

const arg = process.argv[2] || 'patch'
const SEMVER = /^\d+\.\d+\.\d+(-[\w.]+)?$/
const isExplicit = SEMVER.test(arg)

// 0. 预处理检查：确认 package.json 可读、版本合法
if (!fs.existsSync(pkgPath)) {
  console.error('❌ 找不到 package.json')
  process.exit(1)
}
const before = JSON.parse(fs.readFileSync(pkgPath, 'utf8')).version
console.log(`当前版本：${before}`)

// 1. 同步更新 package.json 的 version（--no-git-tag-version 只改文件，不打 tag/提交）
const versionArg = isExplicit ? arg : arg
run(`npm version ${versionArg} --no-git-tag-version --allow-same-version`)
const after = JSON.parse(fs.readFileSync(pkgPath, 'utf8')).version
const tag = `v${after}`

if (after === before && !isExplicit) {
  console.error(`⚠️  版本未变化（仍是 ${after}），请确认 bump 类型是否正确。`)
}

console.log(`➡️  新版本：${after}  (tag: ${tag})`)

// 2. 提交 package.json 改动
run('git add package.json')
run(`git commit -m "release: ${tag}"`)

// 3. 打 tag
run(`git tag ${tag}`)

// 4. 推送 commit + tag
run('git push')
run(`git push origin ${tag}`)

console.log('')
console.log(`✅ 已推送 tag ${tag}，GitHub Actions 将自动：构建 → 发布 npm → 部署文档站`)
console.log('   查看进度：仓库页面 → Actions → release')
