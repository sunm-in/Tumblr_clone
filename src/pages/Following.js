// LIBRARY
import React from "react";
import { css } from "styled-components";

// STYLE
import { flexBox } from "../common/style";

// ELEMENTS
import { Grid, Text, Input } from "../elements";

// COMPONENTS
import BlogUser from "../components/BlogUser";

const Following = (props) => {
  return (
    <React.Fragment>
      <Grid
        addstyle={() => {
          flexBox();
          return css`
            display: flex;
            max-width: 990px;
            padding: 0 8px;
            box-sizing: border-box;
            margin: 8% auto 0;
          `;
        }}
      >
        <Grid width-="100%">
            
        </Grid>

        <Grid
          width="100%"
          bgColor=""
          addstyle={() => {
            return css`
              margin: 0 -10% 38px 10%;
              height: 300px;
            `;
          }}
        >
          <Text
            color="white"
            fontSize="24px"
            fontWeight="bold"
            addstyle={() => {
              return css``;
            }}
          >
            요런 블로그 어때요!
          </Text>

          <hr style={{ marginRight: "20%" }} />

          <BlogUser />
          <BlogUser />
          <BlogUser />
          <BlogUser />
          <BlogUser />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Following;
