export interface Field {
  tag: 'INPUT' | 'TEXTAREA'
  idKey: 'id' | 'name'
  idValue: string
  label: string
}
