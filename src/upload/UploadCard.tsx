import { defineComponent, watch, type PropType } from 'vue'
import Space, { SpaceProps } from '../space'
import { type UploadFile, UploadFileStatus } from './interface'

import Icon from '../icon'
import Image from '../image'

import {
    CloseOutline,
    Wifi,
    AddOutline
} from '@vicons/ionicons5'

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
    setup(props) {
        watch(() => props.uploadFiles, () => {
            if (!props.uploadFiles) return
            props.uploadFiles.forEach(file => {
                if (file.url) {
                    file.__o_src__ = file.url
                } else if (file.file) {
                    const reader = new FileReader()
                    reader.readAsDataURL(file.file)
                    reader.onload = event => {
                        file.__o_src__ = String(event.target?.result)
                    }
                }
            })
        }, {
            immediate: true,
            deep: true
        })
    },
    render() {
        return (
            <Space class={[
                'o-upload',
                {
                    'o-upload__disabled': this.disabled
                }
            ]} size={5} { ...this.spaceProps }>
                {
                    this.showFileList ? (
                        this.$slots.lists?.({ files: this.uploadFiles }) || (
                            this.uploadFiles?.map((file, index) => (
                                this.$slots.list?.({ file }) || (
                                    <div class="o-upload__card" key={file.name + index} onClick={e => {
                                        this.$emit('itemClick', e, file)
                                    }}>
                                        {
                                            file.status === UploadFileStatus.Loading || file.status === UploadFileStatus.Fail ? (
                                                <div class={['o-upload__card-overlay', {
                                                    'is-loading': file.status === UploadFileStatus.Loading
                                                }]}>
                                                    <Icon>
                                                        {
                                                            file.status === UploadFileStatus.Loading ? <Wifi /> : <CloseOutline />
                                                        }
                                                    </Icon>
                                                </div>
                                            ) : null
                                        }
                                        {
                                            !this.disabled && ('pin' in file ? !file.pin : !this.pin) ? (
                                                <div class="o-upload__card-close" onClick={e => {
                                                    e.stopPropagation()
                                                    this.handleDelete?.(file, index)
                                                }}>
                                                    <Icon>
                                                        <CloseOutline />
                                                    </Icon>
                                                </div>
                                            ) : null
                                        }
                                        { this.$slots.cover?.({ file }) }
                                        <Image src={file.__o_src__} fit={'cover'} />
                                    </div>
                                )
                            ))
                        )
                    ) : null
                }
                {
                    this.showButton && !this.disabled ? (
                        this.$slots.default?.({ start: this.startUpload, dragover: this.dragover, disabled: this.disabled }) || (
                            <div
                                class="o-upload__card o-upload__card-add"
                                onDrop={this.handleDrop}
                                onDragover={this.handleDragover}
                                onDragleave={this.handleDragleave}
                                onClick={this.startUpload}
                            >
                                <Icon>
                                    <AddOutline />
                                </Icon>
                                {this.$slots.input?.()}
                            </div>
                        )
                    ) : null
                }
            </Space>
        )
    }
})
