import React from "react";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import Column from "../Column/Column";

function NoMatch() {
  return (
    <GridContainer fluid>
      <GridItem>
        <Column size="md-12">
          <h1>404 Page Not Found</h1>
          <h1>
            <span role="img" aria-label="Face With Rolling Eyes Emoji">
              ( ͠° ͟ʖ ͡°)
            </span>
          </h1>
        </Column>
      </GridItem>
    </GridContainer>
  );
}

export default NoMatch;
