import React, { useState }  from "react";
import { withRouter } from "react-router-dom";
import SearchHashtagPresenter from "./SearchHashtagPresenter";
import { useQuery } from "react-apollo-hooks";
import { SEARCH } from "./SearchHashtagQueries";

export default withRouter(({ location: { search } }) => {
  const term = decodeURIComponent(search.split("=")[1]);
  const [hasMore, setHasMore] = useState(true);
  var limit = 8;
  var cur =0;
  const { data, loading, fetchMore} = useQuery(SEARCH, {
    skip: term === undefined,
    variables: {
      term,
      limit,
      cur
    }
  });
  return <SearchHashtagPresenter searchTerm={term} loading={loading} data={data} fetchMore={fetchMore} hasMore={hasMore} setHasMore={setHasMore}/>;
});