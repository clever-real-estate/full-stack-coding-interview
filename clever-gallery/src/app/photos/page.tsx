"use client";

import WithAuthentication from "../middleware/WithAuthentication";

function PhotosPage() {
  return <div>Photos page</div>;
}

export default WithAuthentication(PhotosPage);
