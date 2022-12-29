import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setIdle } from '../redux/covid';

const Header = ({
  headerName, navbarTitle, miniTitle, hasBack,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBack = () => {
    dispatch(setIdle());
    navigate(-1);
  };

  return (
    <>
      <nav>
        {hasBack && <button type="button" onClick={() => handleBack()} className="btn-back">◀</button>}
        <h3 className="heading">{navbarTitle}</h3>
      </nav>
      <div className="sticky-header">
        <div className="card-label">
          <p>{headerName}</p>
        </div>
        <div className="stats-by-country">
          <p>{miniTitle}</p>
        </div>
      </div>
    </>
  );
};

Header.propTypes = {
  headerName: PropTypes.string.isRequired,
  navbarTitle: PropTypes.string.isRequired,
  miniTitle: PropTypes.string.isRequired,
  hasBack: PropTypes.bool.isRequired,
};

export default Header;
