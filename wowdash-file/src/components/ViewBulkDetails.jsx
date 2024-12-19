import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { Link } from "react-router-dom";

const ViewBulkDetails = () => {
  return (
    <div className="row gy-4">
      <div className="col-xxl-12">
        <div className="card h-100 p-0 email-card overflow-x-auto d-block">
          <div className="min-w-450-px d-flex flex-column justify-content-between h-100">
            <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center gap-3 justify-content-between flex-wrap">
              <div className="d-flex align-items-center gap-2">
                <button className="text-secondary-light d-flex me-8">
                  <Icon
                    icon="mingcute:arrow-left-line"
                    className="icon fs-3 line-height-1"
                  />
                </button>
                <h6 className="mb-0 text-lg">Kathryn Murphy</h6>
              </div>
              <div className="d-flex align-items-center gap-3">
                <button className="text-secondary-light d-flex">
                  <Icon
                    icon="mi:print"
                    className="icon text-xxl line-height-1"
                  />
                </button>
                <button className="text-secondary-light d-flex">
                  <Icon
                    icon="mdi:star-outline"
                    className="icon text-xxl line-height-1"
                  />
                </button>
                <button className="text-secondary-light d-flex">
                  <Icon
                    icon="material-symbols:delete-outline"
                    className="icon text-xxl line-height-1"
                  />
                </button>
              </div>
            </div>
            <div className="card-body p-0">
              <div className="py-16 px-24 border-bottom">
                <div className="d-flex align-items-start gap-3">
                  <img
                    src="assets/images/user-list/user-list1.png"
                    alt="Wowdash"
                    className="w-40-px h-40-px rounded-pill"
                  />
                  <div className="">
                    <div className="d-flex align-items-center flex-wrap gap-2">
                      <h6 className="mb-0 text-lg">Kathryn Murphy</h6>
                    </div>
                    <div className="mt-20">
                      <p className="mb-16 text-primary-light">Hi William</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer py-16 px-24 bg-base shadow-top">
              <form action="#">
                <div className="d-flex align-items-center justify-content-between">
                  <textarea
                    className="textarea-max-height form-control p-0 border-0 py-8 pe-16 resize-none scroll-sm"
                    oninput="adjustHeight(this)"
                    placeholder="Write massage"
                    defaultValue={""}
                  />
                  <div className="d-flex align-items-center gap-4 ms-16">
                    <div className="">
                      <label
                        htmlFor="attatchment"
                        className="text-secondary-light text-xl"
                      >
                        <Icon
                          icon="octicon:link-16"
                          className="icon line-height-1"
                        />
                      </label>
                      <input type="file" id="attatchment" hidden={true} />
                    </div>
                    <div className="">
                      <label
                        htmlFor="gallery"
                        className="text-secondary-light text-xl"
                      >
                        <Icon
                          icon="solar:gallery-bold"
                          className="icon line-height-1"
                        />
                      </label>
                      <input type="file" id="gallery" hidden={true} />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary text-sm btn-sm px-12 py-12 w-100 radius-8 d-flex align-items-center justify-content-center gap-1 h-44-px"
                    >
                      <Icon
                        icon="ion:paper-plane-outline"
                        className="icon text-lg line-height-1"
                      />
                      Send
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBulkDetails;
