import React from 'react';
import styled from 'styled-components';

const Host = styled.p`
  font-size: .7em;
`;

const Label = styled.span`
  font-weight: 700;
`;

export const Credits = () => {
  return <Host>
    <Label>Icon credits: </Label>
    Cherry by alkhalifi_design from <a href="http://thenounproject.com/">the Noun Project</a>
  </Host>;
};
