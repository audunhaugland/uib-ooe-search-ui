import React from "react";
//import moment from "moment";

import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";


import {
  ErrorBoundary,
  Facet,
  SearchProvider,
  SearchBox,
  Results,
  PagingInfo,
  ResultsPerPage,
  Paging,
  Sorting,
  WithSearch
} from "@elastic/react-search-ui";
import {
  //BooleanFacet,
  Layout,
  //SingleSelectFacet,
  //SingleLinksFacet
} from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";

const SORT_OPTIONS = [
  {
    name: "Order by",
    value: "",
    direction: ""
  },
  {
    name: "Title",
    value: "title",
    direction: "asc"
  }
];

const connector = new AppSearchAPIConnector({
  searchKey: "",
  engineName: "search-ui",
  endpointBase: "https://ooe.5.erkunde.no/site/ooe/",
  cacheResponses: true
});

const config = {
  alwaysSearchOnInitialLoad: true,
  searchQuery: {
    language: window.language,
    contentType: window.contentType,
    contextFilter: window.contextFilter,
    returnFacets: window.returnFacets
  },
  autocompleteQuery: {
    language: window.language
  },
  apiConnector: connector
};

export default function App() {
  return (
    <SearchProvider config={config}>
      <WithSearch mapContextToProps={({ wasSearched }) => ({ wasSearched })}>
        {({ wasSearched }) => {
          return (
            <div className="App">
              <ErrorBoundary>
                <Layout
                  header={
                    <SearchBox
                      autocompleteMinimumCharacters={3}
                      //searchAsYouType={true}
                      autocompleteResults={{
                        linkTarget: "_blank",
                        sectionTitle: "Results",
                        titleField: "title",
                        urlField: "nps_link",
                        shouldTrackClickThrough: true,
                        clickThroughTags: ["test"]
                      }}
                      autocompleteSuggestions={true}
                      debounceLength={0}
                    />
                  }
                  sideContent={
                    <div>
                      <div id="facets" className="facets">
                        {false && wasSearched && (
                          <Sorting sortOptions={SORT_OPTIONS} />
                        )}

                        <Facet
                          field="category"
                          label=""
                          filterType="any"
                          //view={SingleLinksFacet}
                          //isFilterable={true}
                        />
                      </div>
                    </div>
                  }
                  bodyContent={
                    <Results
                      titleField="title"
                      urlField="itemurl"
                      thumbnailField="image_url"
                      shouldTrackClickThrough={true}
                    />
                  }
                  bodyHeader={
                    <React.Fragment>
                      {wasSearched && <PagingInfo />}
                      {wasSearched && <ResultsPerPage />}
                    </React.Fragment>
                  }
                  bodyFooter={<Paging />}
                />
              </ErrorBoundary>
            </div>
          );
        }}
      </WithSearch>
    </SearchProvider>
  );
}