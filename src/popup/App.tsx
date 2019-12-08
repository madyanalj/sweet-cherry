import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { sendMessageToContent } from '../shared/messaging';
import { Field } from '../shared/models';
import { getValue, setValue } from '../shared/storage';
import { ArrayElement, csvToArray } from '../shared/utils';
import { Global } from './Global';
import { Credits } from './sections/Credits';

const Host = styled.div`
  min-width: 500px;
  padding: var(--s-sm);
  display: grid;
  gap: var(--s-md);
`;

export const App = () => {
  const [mode, setMode] = useState<'READ' | 'WRITE'>('WRITE');
  const [textData, setTextData] = useState('');
  const [fields, setFields] = useState<Field[]>([]);
  const [data, setData] = useState<string[][]>([]);

  function applyRow(row: ArrayElement<typeof data>) {
    const payload = fields
      .map((field, i) => ({ field, value: row[i] }))
      .filter(({ value }) => !!value);

    sendMessageToContent('FILL_FIELDS', payload);
  }

  useEffect(() => {
    (async () => {
      const fetchedFields = await sendMessageToContent('FETCH_FIELDS');
      setFields(fetchedFields);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const storedTextData = await getValue<string>('textData');
      if (storedTextData) {
        setTextData(storedTextData);
        setMode('READ');
      }
    })();
  }, []);

  useEffect(() => {
    if (mode === 'READ') {
      setData(csvToArray(textData));
      setValue('textData', textData);
    }
  }, [mode]);

  return <Global>
    <Host>
      <div>{
        mode === 'READ'
          ? <button onClick={() => { setMode('WRITE') }}>
            👀 Edit Data
          </button>
          : <>
            <textarea rows={10} value={textData} onChange={(event) => setTextData(event.target.value)} />
            <button onClick={() => { setMode('READ') }} disabled={!textData}>Replace Data</button>
          </>
      }</div>

      <table>
        <thead>
        <tr>
          <th key={-1} /> {/* extra header for action buttons */}
          {
            fields
              .map(({ idValue }) => idValue)
              .map((header, i) => <th key={i}>{header}</th>)
          }
        </tr>
        </thead>
        <tbody>{
          data.map((row, i) => <tr key={i}>
            <td>
              <button onClick={() => applyRow(row)}>✨</button>
            </td>
            {row.map((value, j) => <td key={j}>{value}</td>)}
          </tr>)
        }</tbody>
      </table>

      <Credits />
    </Host>
  </Global>;
};
