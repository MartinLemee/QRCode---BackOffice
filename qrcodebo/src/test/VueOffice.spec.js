import { mount } from '@vue/test-utils'
import vueOffice from '../components/vueOffice.vue'

describe("vueOffice.vue", () => {
    it('a le hook `created`', () => {
        expect(typeof vueOffice.created).toBe('function')
      })
    const wrapper = mount(vueOffice)
    expect(wrapper.text()).toContain('infos: ""')
})