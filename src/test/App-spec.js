
import React from 'react';
import {MyPostsPage} from '../pages/MyPostsPage/MyPostsPage'


let TestUtils = React.addons.TestUtils;


describe('MyComponent', function() {
  var Utils = React.addons.TestUtils;

  it('can render without error', function() {
    var component, element;
    element = React.createElement(
      MyComponent, 
    );
    expect(function() {
      component = Utils.renderIntoDocument(element);
    }).not.toThrow();
  });
})