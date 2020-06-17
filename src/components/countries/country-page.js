import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Wrapper from "../wrapper/wrapper";
import { useSelector } from "react-redux";
import CountrySelected from "../countries/country-selected";

const CountryPageStyled = styled.div`
  .return-btn {
    cursor: pointer;
    background: var(--white);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    padding: 0.7em 2.2em;
    border-radius: 5px;
    border: none;
    margin-top: 1em;
    color: var(--black);
  }
  i {
    margin-right: 5px;
  }
  @media screen and (min-width: 1024px) {
    margin-top: 3em;
  }
`;

export default function CountryPage({ match, history }) {
  let DBcountry = useSelector((state) =>
    state.countryList.find(
      (item) => item.name === match.params.id.replace("-", " ")
    )
  );

  const [country, setCountry] = useState(DBcountry);

  useEffect(() => {
    if (!country) {
      fetch(`https://restcountries.eu/rest/v2/name/${match.params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setCountry(data[0]);
        });
    }
  }, [country, match.params.id]);

  function handleClick() {
    history.goBack();
  }

  return (
    <CountryPageStyled>
      <Wrapper>
        <button className="return-btn" onClick={handleClick}>
          <i class="fas fa-arrow-left"></i>Return
        </button>
        <CountrySelected {...country} />
      </Wrapper>
    </CountryPageStyled>
  );
}
