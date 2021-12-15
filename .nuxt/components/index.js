export const AddPlanField = () => import('../../components/AddPlanField.vue' /* webpackChunkName: "components/add-plan-field" */).then(c => wrapFunctional(c.default || c))
export const CertificatePopup = () => import('../../components/CertificatePopup.vue' /* webpackChunkName: "components/certificate-popup" */).then(c => wrapFunctional(c.default || c))
export const CertificatePresentation = () => import('../../components/CertificatePresentation.vue' /* webpackChunkName: "components/certificate-presentation" */).then(c => wrapFunctional(c.default || c))
export const CommentSection = () => import('../../components/CommentSection.vue' /* webpackChunkName: "components/comment-section" */).then(c => wrapFunctional(c.default || c))
export const FollowedCard = () => import('../../components/FollowedCard.vue' /* webpackChunkName: "components/followed-card" */).then(c => wrapFunctional(c.default || c))
export const PopUpCard = () => import('../../components/PopUpCard.vue' /* webpackChunkName: "components/pop-up-card" */).then(c => wrapFunctional(c.default || c))
export const TrainingPlanLink = () => import('../../components/TrainingPlanLink.vue' /* webpackChunkName: "components/training-plan-link" */).then(c => wrapFunctional(c.default || c))
export const CommentsCommentDisplay = () => import('../../components/comments/CommentDisplay.vue' /* webpackChunkName: "components/comments-comment-display" */).then(c => wrapFunctional(c.default || c))
export const TrainingsPlanSelectorTrainingDraggable = () => import('../../components/trainingsPlanSelector/TrainingDraggable.vue' /* webpackChunkName: "components/trainings-plan-selector-training-draggable" */).then(c => wrapFunctional(c.default || c))
export const TrainingsPlanSelectorTrainingDropZone = () => import('../../components/trainingsPlanSelector/TrainingDropZone.vue' /* webpackChunkName: "components/trainings-plan-selector-training-drop-zone" */).then(c => wrapFunctional(c.default || c))
export const TrainingsPlanSelectorContainer = () => import('../../components/trainingsPlanSelector/TrainingsPlanSelectorContainer.vue' /* webpackChunkName: "components/trainings-plan-selector-container" */).then(c => wrapFunctional(c.default || c))

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
