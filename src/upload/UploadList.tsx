import { h, defineComponent, type PropType } from 'vue'

import Icon from '../icon'
import Button from '../button'
import Space, { SpaceProps } from '../space'

import {
    CloseOutline,
    Wifi,
    CheckmarkCircleSharp,
    CloudUploadOutline
} from '@vicons/ionicons5'

import { type UploadFile, UploadFileStatus } from './interface'
import svgs, { start } from './svgs'

const Icons = {
    [UploadFileStatus.Success]: CheckmarkCircleSharp,
    [UploadFileStatus.Waiting]: CloudUploadOutline,
    [UploadFileStatus.Loading]: Wifi,
    [UploadFileStatus.Fail]: CloseOutline
}

export default defineComponent({
    props: {
        drop: Boolean,
        dragover: Boolean,
        disabled: Boolean,
        showButton: Boolean,
        showFileList: Boolean,
        multiple: Boolean,
        accept: String,
        pin: Boolean,
        uploadFiles: Array as PropType<UploadFile[]>,
        startUpload: Function as PropType<() => void>,
        handleChange: Function as PropType<(e: Event) => void>,
        handleDelete: Function as PropType<(file: UploadFile, index: number) => void>,
        handleDrop: Function as PropType<(e: DragEvent) => void>,
        handleDragover: Function as PropType<(e: DragEvent) => void>,
        handleDragleave: Function as PropType<(e: DragEvent) => void>,
        spaceProps: Object as PropType<Partial<SpaceProps> | Record<string, any>>
    },
    emits: {
        itemClick: (e: Event, value: UploadFile) => {
            void e
            void value
            return true
        }
    },
    setup() {
        const getFileTypeIcon = (filename: string) => {
            const execFilename = /\.(.+)?$/.exec(filename)
            if (!execFilename?.[1]) return `${start}${svgs.default}</svg>`
            return `${start}${(svgs as Record<string, string>)[execFilename[1].toLowerCase()] || svgs.default}</svg>`
        }

        const getStatusIcon = (status?: UploadFileStatus) => {
            if (status) {
                return Icons[status] || Icons[UploadFileStatus.Success]
            } 
                return Icons[UploadFileStatus.Success]
            
        }

        return {
            getFileTypeIcon,
            getStatusIcon
        }
    },
    render() {
        return (
            <Space class={[
                'o-upload',
                {
                    'o-upload__disabled': this.disabled
                }
            ]} vertical>
                {
                    this.showButton ? (
                        <div
                            class={[
                                'o-upload__button'
                            ]}
                            onDrop={this.handleDrop}
                            onDragover={this.handleDragover}
                            onDragleave={this.handleDragleave}
                        >
                            {
                                this.$slots.default?.({ start: this.startUpload, dragover: this.dragover, disabled: this.disabled }) || (
                                    this.drop ? (
                                        <div class={[
                                            'o-upload__drag-button',
                                            {
                                                'o-upload__upload__drag-button__dragover': this.dragover
                                            }
                                        ]} onClick={this.startUpload}>
                                            <Icon class="o-upload__drag-icon">
                                                <CloudUploadOutline />
                                            </Icon>
                                            <span>拖拽文件到这里或者 <em>点击上传</em></span>
                                        </div>
                                    ) : (
                                        <Button type="primary" onClick={this.startUpload} disabled={this.disabled}>点击上传</Button>
                                    )
                                )
                            }
                            { this.$slots.input?.() }
                        </div>
                    ) : null
                }
                {
                    this.$slots.description?.()
                }
                {
                    this.showFileList && this.uploadFiles && this.uploadFiles?.length > 0 ? (
                        <div class="o-upload__cells">
                            {
                                this.$slots.lists?.({ files: this.uploadFiles }) || (
                                    this.uploadFiles?.map((file, index) => (
                                        this.$slots.list?.({ file }) || (
                                            <div class="o-upload__cell" onClick={e => this.$emit('itemClick', e, file)} key={file.name + index}>
                                                {
                                                    this.$slots.icon?.(file) || (
                                                        <Icon
                                                            class={'o-upload__cell-icon'}
                                                            v-html={this.getFileTypeIcon(file.file?.name || file.name)}
                                                        />
                                                    )
                                                }
                                                <div class="o-upload__cell-name">
                                                    {
                                                        this.$slots.title?.(file) || (
                                                            <>
                                                                {
                                                                    file.url ? (
                                                                        <a href={file.url} target="_blank" onClick={e => e.stopPropagation()}>{file.name}</a>
                                                                    ): file.name
                                                                }
                                                                {
                                                                    file.progress && file.status === UploadFileStatus.Loading ? (
                                                                        <span class="o-upload__cell-progress">
                                                                            { file.progress }%
                                                                        </span>
                                                                    ) : null
                                                                }
                                                            </>
                                                        )
                                                    }
                                                </div>
                                                <Space class="o-upload__cell-status" size={5} { ...this.spaceProps }>
                                                    {
                                                        this.$slots.status?.(file) || (
                                                            <Icon class={`o-upload__cell-status-${file.status || 0}`}>
                                                                {
                                                                    h(this.getStatusIcon(file.status))
                                                                }
                                                            </Icon>
                                                        )
                                                    }
                                                    {
                                                        !this.disabled && ( 'pin' in file ? !file.pin : !this.pin ) ? (
                                                            <Icon class="o-upload__cell-delete" onClick={e => {
                                                                e.stopPropagation()
                                                                this.handleDelete?.(file, index)
                                                            }}>
                                                                <CloseOutline />
                                                            </Icon>
                                                        ) : null
                                                    }
                                                </Space>
                                            </div>
                                        )
                                    ))
                                )
                            }
                        </div>
                    ) : null
                }
            </Space>
        )
    }
})