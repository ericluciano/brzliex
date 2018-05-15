import React from 'react';
import PropTypes from 'prop-types';

const investingTab = props => (
  <div className={`tabcontent ${props.status}`}>
    <div>
      <iframe src="https://br.investingwidgets.com/top-cryptocurrencies?theme=darkTheme" title="investing" frameBorder="0" allowTransparency="true" className="frameInvesting" />
    </div>
  </div>
);

investingTab.propTypes = {
  status: PropTypes.string.isRequired,
};

export default investingTab;
