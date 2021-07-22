// LIBRARY
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

// STYLE
import { css } from "styled-components";

// ELEMENTS
import { Grid, Text } from "../elements";

// COMPONENTS
import Permit from "../components/Permit";
import MyFollower from "../components/MyFollower";
import BlogUser from "../components/BlogUser";
import NoInfo from "../components/NoInfo";

// ICON

// REDUX
import { myPageActions } from "../redux/modules/mypage";

const Followers = (props) => {
  const dispatch = useDispatch();

  const { followerList } = useSelector(
    (state) => ({
      followerList: state.mypage.list,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(myPageActions.getMyFollowerDB());

    return () => {
      dispatch(myPageActions.getMyPageFollower([], 0));
    };
  }, []);

  return (
    <Permit>
      <Grid margin="3% 0 0 0">
        <Text fontSize="18px" color="white">
          팔로워
        </Text>

        {followerList.map((follower) => {
          return (
            <MyFollower
              post={follower}
              key={(Date.now() + Math.random()).toString(36)}
            ></MyFollower>
          );
        })}
        <Grid width="100%" margin="0 0 0 0">
          <NoInfo />
          <Text
            color="gray"
            fontSize="32px"
            fontWeight="bold"
            addstyle={() => {
              return css`
                position: absolute;
                top: 70%;
                left: 21%;
              `;
            }}
          >
            팔로워 0명
          </Text>
        </Grid>
      </Grid>
      <BlogUser />
    </Permit>
  );
};

export default Followers;
