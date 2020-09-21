import React, { useState }  from "react";
import { withRouter } from "react-router-dom";
import HashtagPagePresenter from "./HashtagPagePresenter";
import { useQuery } from "react-apollo-hooks";
import { SEARCH } from "./HashtagPageQueries";

export default withRouter(({ location: { search } }) => {
  const term = decodeURIComponent(search.split('?')[1]);
  const [hasMore, setHasMore] = useState(true);
  const { data, loading, fetchMore} = useQuery(SEARCH, {
    skip: term === undefined,
    variables: {
      term
    }
  });
  return <HashtagPagePresenter searchTerm={term} loading={loading} data={data} fetchMore={fetchMore} hasMore={hasMore} setHasMore={setHasMore}/>;
});