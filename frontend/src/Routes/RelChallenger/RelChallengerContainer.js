import React from "react";
import { withRouter } from "react-router-dom";
import RelChallengerPresenter from "./RelChallengerPresenter";
import { useQuery } from "react-apollo-hooks";
import { FOLLOW } from "./RelChallengerQueries";

export default withRouter(({ location: { search } }) => {
  const id= search.split('?')[1];
  var limit = 100;
  var cur =0;
  const { data, loading} = useQuery(FOLLOW, {
    variables: {
      id,
      limit,
      cur
    }
  });
  return <RelChallengerPresenter nickname={id} loading={loading} data={data} />;
});