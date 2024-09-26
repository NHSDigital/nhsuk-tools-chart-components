import { BpCellConfiguration } from '@custom-types/blood-pressure.types';
import React from 'react';

import './styles/bp-chart-cell.module.scss';

export function BpChartCell({
  firstInRow = false,
  firstInColumn = false,
}: Readonly<BpCellConfiguration>): JSX.Element {
  let classNames = 'nhsuk-bp-graph-cell';

  if (firstInRow) {
    classNames += ` ${'nhsuk-bp-first-in-row'}`;
  }

  if (firstInColumn) {
    classNames += ` ${'nhsuk-bp-first-in-column'}`;
  }

  return <div className={classNames} />;
}
