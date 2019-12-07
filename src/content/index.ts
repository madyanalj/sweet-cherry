import { addMessageListener } from '../shared/messaging';
import { Field } from '../shared/models';

type FieldElement = HTMLInputElement | HTMLTextAreaElement;

const selectors = 'input:not([type=checkbox]):not([type=radio]):not([type=hidden]), textarea';
const getFieldElements = () => [...document.querySelectorAll<FieldElement>(selectors)];
const getIdKey = (element: FieldElement) => element.id ? 'id' : (element.name ? 'name' : null);

addMessageListener({
  FETCH_FIELDS: () =>
    getFieldElements()
      .map((element) => ({ element, idKey: getIdKey(element) }))
      .filter(({ idKey }) => idKey)
      .map(({ element, idKey }) => {
        const tag = element.tagName as Field['tag'];
        const castedIdKey = idKey as Field['idKey'];
        return ({ tag, idKey: castedIdKey, idValue: element[castedIdKey] });
      }),

  FILL_FIELDS: (fieldValues) => {
    fieldValues.forEach(({ field, value }) => {
      const element = document.querySelector<FieldElement>(`${field.tag}[${field.idKey}="${field.idValue}"]`);
      if (!element) {
        throw new Error(`Cannot find element for field ${field} to fill with value "${value}"`);
      }
      element.value = value;
      ['focus', 'click', 'input', 'change', 'blur'].forEach((type) => {
        element.dispatchEvent(new Event(type, { bubbles: true })); // to trigger event listeners (e.g. validation)
      });
    });
  },
});
