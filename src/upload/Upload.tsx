import { useAutoControl } from '../utils'
import { ref, defineComponent, ExtractPropTypes, PropType } from 'vue'

import UploadList from './UploadList'
import UploadCard from './UploadCard'

import { type UploadFile, UploadFileStatus } from './interface'
import { SpaceProps } from '../space'

export const uploadProps = {
    modelValue: {
        type: Array as PropType<UploadFile[]>,
        default: undefined
    },
    multiple: Boolean,
    accept: String,
    drop: Boolean,
    delete: Function as PropType<(file: UploadFile) => Promise<void>>,
    upload: Function as PropType<(filterFiles: UploadFile[], file: UploadFile[]) => Promise<void>>,
    pin: Boolean,
    autoUpload: {
        type: Boolean,
        default: false
    },
    limit: {
        type: Number,
        default: 0
    },
    showFileList: {
        type: Boolean,
        default: true
    },
    showButton: {
        type: Boolean,
        default: true
    },
    disabled: Boolean,
    preset: {
        type: String,
        default: 'list'
    },
    spaceProps: Object as PropType<Partial<SpaceProps> | Record<string, any>>,
    cover: {
        type: Boolean,
        default: true
    }
}

export type UploadProps = ExtractPropTypes<typeof uploadProps>

export default defineComponent({
    name: 'OUpload',
    props: uploadProps,
    emits: {
        'update:modelValue': (value: UploadFile[]) => Array.isArray(value),
        itemClick: (e: Event, value: UploadFile) => {
            void e
            void value
            return true
        }
    },
    expose: ['submit', 'addUpload'],
    setup(props, { emit }) {
        const uploadFilesRef = ref<UploadFile[]>([])
        const uploadFiles = useAutoControl(uploadFilesRef, props, 'modelValue', emit, {
            passive: true,
            deep: true
        })
        const fileRef = ref<HTMLInputElement | null>(null)

        const startUpload = () => {
            if (props.disabled) return
            fileRef.value?.click()
        }

        const handleUpload = async() => {
            const filterFiles = uploadFiles.value.filter(file => {
                if (file.status === UploadFileStatus.Waiting) {
                    file.status = UploadFileStatus.Loading
                    return true
                }
                return false
            })
            if (filterFiles.length === 0) return
            await props.upload?.(filterFiles, uploadFiles.value)
        }

        const handleRetry = async(file: UploadFile) => {
            file.status = UploadFileStatus.Loading
            await props.upload?.([file], uploadFiles.value)
        }

        const handleAddUpload = async(files: FileList | File[]) => {
            if (files.length === 0) return
            for (let i = 0; i < files.length; i++) {
                uploadFiles.value.push({
                    name: files[i].name,
                    file: files[i],
                    progress: 0,
                    status: UploadFileStatus.Waiting
                })
            }
            const deleteList: UploadFile[] = [] 
            if (props.limit) {
                while (uploadFiles.value.length > props.limit) {
                    const func = props.cover ? 'shift' : 'pop'
                    const file = uploadFiles.value[func]()
                    if (
                        file &&
                        (!file.status || file.status === UploadFileStatus.Loading)
                    ) deleteList.push(file)
                }
            }
            deleteList.forEach(async(file) => {
                await props.delete?.(file)
            })
            if (props.autoUpload) {
                handleUpload()
            }
        }

        const handleChange = async(e: Event) => {
            try {
                if (props.disabled) return
                const {files} = e.target as HTMLInputElement
                if (!files) return
                await handleAddUpload(files)
            } finally {
                (e.target as HTMLInputElement).value = ''
            }
        }

        const handleDelete = async(file: UploadFile, index: number) => {
            if (props.disabled) return
            await props.delete?.(file)
            uploadFiles.value.splice(index, 1)
        }

        const dragover = ref(false)

        const handleDragleave = (e: DragEvent) => {
            if (props.disabled) return
            if (!props.drop) return
            e.preventDefault()
            dragover.value = false
        }

        const handleDragover = (e: DragEvent) => {
            if (props.disabled) return
            if (!props.drop) return
            e.preventDefault()
            dragover.value = true
        }

        const handleDrop = (e: DragEvent) => {
            if (props.disabled) return
            if (!props.drop) return
            e.preventDefault()
            const files = Array.from(e.dataTransfer?.files || []).filter((file) => {
                if (!props.accept) return true
                const { type, name } = file
                const extension =
                    name.indexOf('.') > -1 ? `.${name.split('.').pop()}` : ''
                const baseType = type.replace(/\/.*$/, '')
                return props.accept
                    .split(',')
                    .map(type => type.trim())
                    .filter(type => type)
                    .some(acceptedType => {
                        if (acceptedType.startsWith('.')) {
                            return extension === acceptedType
                        }
                        if (/\/\*$/.test(acceptedType)) {
                            return baseType === acceptedType.replace(/\/\*$/, '')
                        }
                        if (/^[^/]+\/[^/]+$/.test(acceptedType)) {
                            return type === acceptedType
                        }
                        return false
                    })
            })
            dragover.value = false
            handleAddUpload(files)
        }

        return {
            fileRef,
            uploadFiles,
            dragover,
            startUpload,
            submit: handleUpload,
            addUpload: handleAddUpload,
            handleChange,
            handleDelete,
            handleDrop,
            handleDragleave,
            handleDragover,
            handleRetry
        }
    },
    render() {
        const renderInputRef = () => (
            <input
                ref="fileRef"
                type="file"
                class="o-upload__file"
                multiple={this.multiple && this.limit !== 1}
                accept={this.accept}
                onChange={this.handleChange}
            />
        )
        switch (this.preset) {
            case 'card':
                return (
                    <UploadCard
                        pin={this.pin}
                        drop={this.drop}
                        dragover={this.dragover}
                        disabled={this.disabled}
                        multiple={this.multiple}
                        accept={this.accept}
                        uploadFiles={this.uploadFiles}
                        showButton={this.showButton}
                        showFileList={this.showFileList}
                        handleDrop={this.handleDrop}
                        handleDragover={this.handleDragover}
                        handleDragleave={this.handleDragleave}
                        startUpload={this.startUpload}
                        handleChange={this.handleChange}
                        handleDelete={this.handleDelete}
                        handleRetry={this.handleRetry}
                        spaceProps={this.spaceProps}
                        onItemClick={(e, file) => this.$emit('itemClick', e, file)}
                        v-slots={{
                            ...this.$slots,
                            input: renderInputRef
                        }}
                    />
                )
            default:
                return (
                    <UploadList
                        pin={this.pin}
                        drop={this.drop}
                        dragover={this.dragover}
                        disabled={this.disabled}
                        multiple={this.multiple}
                        accept={this.accept}
                        uploadFiles={this.uploadFiles}
                        showButton={this.showButton}
                        showFileList={this.showFileList}
                        handleDrop={this.handleDrop}
                        handleDragover={this.handleDragover}
                        handleDragleave={this.handleDragleave}
                        startUpload={this.startUpload}
                        handleChange={this.handleChange}
                        handleDelete={this.handleDelete}
                        handleRetry={this.handleRetry}
                        spaceProps={this.spaceProps}
                        onItemClick={(e, file) => this.$emit('itemClick', e, file)}
                        v-slots={{
                            ...this.$slots,
                            input: renderInputRef
                        }}
                    />
                )
        }
    }
})
