export const customizeToolbar = (toolbar) => {
    let tabs = toolbar.getTabs();
    toolbar.getTabs = function () {
      delete tabs[0];
      delete tabs[1];
      delete tabs[2];
      delete tabs[5];
    //  delete tabs[6];
      return tabs;
    };
  };
  