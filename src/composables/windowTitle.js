/*
 * vuensee
 * @author Anders Evenrud <andersevenrud@gmail.com>
 * @link https://github.com/andersevenrud/vuensee
 * @license MIT
 */

import { computed, onBeforeMount } from 'vue'

/**
 * Composable to manipulate window document title
 */
export const useWindowTitle = (defaultTitle) => {
  const createTitle = title => title
    ? `${title} - ${defaultTitle}`
    : defaultTitle

  const windowTitle = computed({
    set: v => (document.title = createTitle(v))
  })

  onBeforeMount(() => (windowTitle.value = ''))

  return {
    windowTitle
  }
}
