export { default as AddPlanField } from '../../components/AddPlanField.vue'
export { default as CertificatePresentation } from '../../components/CertificatePresentation.vue'
export { default as CommentSection } from '../../components/CommentSection.vue'
export { default as FollowedCard } from '../../components/FollowedCard.vue'
export { default as PopUpCard } from '../../components/PopUpCard.vue'
export { default as TrainingPlanLink } from '../../components/TrainingPlanLink.vue'
export { default as CommentsCommentDisplay } from '../../components/comments/CommentDisplay.vue'
export { default as TrainingsPlanSelectorTrainingDraggable } from '../../components/trainingsPlanSelector/TrainingDraggable.vue'
export { default as TrainingsPlanSelectorTrainingDropZone } from '../../components/trainingsPlanSelector/TrainingDropZone.vue'
export { default as TrainingsPlanSelectorContainer } from '../../components/trainingsPlanSelector/TrainingsPlanSelectorContainer.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
