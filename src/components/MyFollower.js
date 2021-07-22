// LIBRARY
import React from "react";
import { css } from "styled-components";

// STYLE
import { flexBox } from "../common/style";

// ELEMENTS
import { Grid, Text, Image } from "../elements";

// ICON
import MoreVertIcon from "@material-ui/icons/MoreVert";

// REDUX

// COMPONENTS

const MyFollower = ({ post }) => {
  return (
    <React.Fragment>
      <Grid
        width="100%"
        margin="5% 0 0 0"
        addstyle={() => {
          flexBox();
          return css`
            display: flex;
          `;
        }}
      >
        <Grid width="100%" margin="0 10% 0 0">
          <Grid width="100%" margin="0 0 0 0">
            <Grid margin="-2% 0 0 0">
              <Grid
                padding="12px"
                bgColor="white"
                addstyle={() => {
                  return css`
                    display: flex;
                    align-items: center;
                  `;
                }}
              >
                <Image
                  addstyle={() => {
                    return css`
                      width: 36px;
                    `;
                  }}
                  height="36px"
                  src="https://assets.tumblr.com/images/default_avatar/octahedron_open_128.png"
                />

                <Grid
                  magin="0 0 3% 0"
                  addstyle={() => {
                    return css`
                      display: flex;
                      flex-direction: column;
                      padding: 4px;
                    `;
                  }}
                >
                  <Text
                    fontSize="13px"
                    fontWeight="bold"
                    addstyle={() => {
                      return css`
                        padding: 2px;
                      `;
                    }}
                  >
                    {post.nickname}
                  </Text>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default MyFollower;
