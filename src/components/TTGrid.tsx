import _ from "lodash";
import styled from "styled-components";
import { ReactNode } from "react";
import { lighten } from "polished";
import { colors } from "@/constants";

const borderColor = lighten(0.2, colors.primary);

const Td = styled.td`
  border-right: 2px solid ${borderColor};
  width: 7rem;
  height: 7rem;
`;

const GridCell = ({
  x,
  y,
  renderCell,
}: {
  x: number;
  y: number;
  renderCell: (y: number, x: number) => ReactNode;
}) => {
  return <Td>{renderCell(y, x)}</Td>;
};

const Tr = styled.tr`
  td {
    border-bottom: 2px solid ${borderColor};
  }
  td:last-of-type {
    border-right: none;
  }
`;

const GridRow = ({
  y,
  columns,
  renderCell,
}: {
  y: number;
  columns: number;
  renderCell: (y: number, x: number) => ReactNode;
}) => {
  return (
    <Tr>
      {_.range(columns).map((n) => {
        return <GridCell key={n} x={n} y={y} renderCell={renderCell} />;
      })}
    </Tr>
  );
};

const Table = styled.table`
  border-collapse: collapse;
  tr:last-of-type td {
    border-bottom: none;
  }
`;

interface TTGridProps {
  renderCell: (y: number, x: number) => ReactNode;
}

export const TTGrid = (props: TTGridProps) => {
  const gridY = 3;
  const gridX = 3;

  return (
    <Table>
      <tbody>
        {_.range(gridY).map((n) => (
          <GridRow
            key={n}
            y={n}
            columns={gridX}
            renderCell={props.renderCell}
          />
        ))}
      </tbody>
    </Table>
  );
};
