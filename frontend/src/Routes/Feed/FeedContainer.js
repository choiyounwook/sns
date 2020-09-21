import React, { useState } from "react";
import withRouter from "react-router-dom/withRouter";
import { useQuery } from "react-apollo-hooks";
import FeedPresenter from "./FeedPresenter";
import { FEED_QUERY } from "./FeedQueries";
import CreatePhotoPost from "../CreatePhotoPost";

export default withRouter(() => {
  const [hasMore, setHasMore] = useState(true);
  const [create, setCreate] = useState(false);
  const [selHashtags, setSelHashtags] = useState("");
  const [pid, setPid] = useState("");
  const [cat, setCat] = useState("");

  var limit = 5;
  var cur = 0;
  const { data, loading, fetchMore } = useQuery(FEED_QUERY, {
    variables: {
      limit,
      cur,
    },
  });
  return (
    <FeedPresenter
      loading={loading}
      data={data}
      fetchMore={fetchMore}
      hasMore={hasMore}
      setHasMore={setHasMore}
      create={create}
      setCreate={setCreate}
      selHashtags={selHashtags}
      setSelHashtags={setSelHashtags}
      pid={pid}
      setPid={setPid}
      cat={cat}
      setCat={setCat}
    />
  );
});
