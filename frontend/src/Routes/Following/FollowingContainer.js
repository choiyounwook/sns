import React from "react";
import { withRouter } from "react-router-dom";
import FollowingPresenter from "./FollowingPresenter";
import { useQuery } from "react-apollo-hooks";
import { FOLLOW } from "./FollowingQueries";

export default withRouter(({ location: { search } }) => {
  const id= search.split('?')[1];
  var limit = 8;
  var cur =0;
  const { data, loading, fetchMore } = useQuery(FOLLOW, {
    variables: {
      id,
      limit,
      cur
    }
  });
  return <FollowingPresenter nickname={id} loading={loading} data={data} fetchMore={fetchMore}/>;
});