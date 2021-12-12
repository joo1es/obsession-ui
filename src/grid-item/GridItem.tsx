import { computed, defineComponent, inject } from 'vue';
import type { ExtractPropTypes } from 'vue';

export const gridItemProps = {
  span: Number,
  rowSpan: Number,
  offset: {
    type: Number,
    default: 0,
  },
  offsetRight: {
    type: Number,
    default: 0,
  },
};

export type GridItemProps = ExtractPropTypes<typeof gridItemProps>;

export default defineComponent({
  name: 'OGridItem',
  inheritAttrs: false,
  props: gridItemProps,
  setup(props, { slots, attrs }) {
    console.log(attrs);
    const span = computed(() => {
      const defaultSpan = inject<number>('defaultSpan');
      return props.span || defaultSpan || 1;
    });
    return () => (
      <>
        {props.offset ? (
          <div
            class="o-grid-item__offset"
            style={{
              gridColumn: `span ${props.offset} / span ${props.offset}`,
            }}
          />
        ) : (
          ''
        )}
        <div
          class="o-grid-item"
          style={{
            gridColumn: `span ${span.value} / span ${span.value}`,
            gridRow: `span ${props.rowSpan || 1} / span ${props.rowSpan || 1}`,
          }}
          {...attrs}
        >
          {slots.default?.()}
        </div>
        {props.offsetRight ? (
          <div
            class="o-grid-item__offset o-grid-item__offset-right"
            style={{
              gridColumn: `span ${props.offsetRight} / span ${props.offsetRight}`,
            }}
          />
        ) : (
          ''
        )}
      </>
    );
  },
});
