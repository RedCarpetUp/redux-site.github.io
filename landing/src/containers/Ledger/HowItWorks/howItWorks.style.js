import styled from "styled-components";

export const ContentWrapper = styled.div`
    table {
        width: auto;
        display: table;
        margin: 50px 0;
        border-collapse: collapse;
        border: 1px solid #ddd;
        border-spacing: 0;
        thead { display: table-header-group; }
        tbody { display: table-row-group; }
        tr {
            display: table-row;
        }
        th, td {
          padding: 0.4rem;
          border: 1px solid #ddd;
        }
        tr:nth-child(even) {
          background-color: #f2f2f2;
        }
    }
    @media screen and (max-width: 770px) {
        .compress {
            thead {
                border: none;
                clip: rect(0 0 0 0);
                height: 1px;
                margin: -1px;
                overflow: hidden;
                padding: 0;
                position: absolute;
                width: 1px;
            }

            td {
                padding: 0.5rem;
                border-bottom: 1px solid #ddd;
                display: block;
                font-size: 1rem;
                text-align: right;
                &::before {
                    content: attr(data-label);
                    float: left;
                    font-weight: bold;
                    text-transform: uppercase;
                }
            }
        }
    }
  .Heading {
    color: #ff4a4c;
    font-size: 40px;
    font-style: normal;
    font-weight: 500;
    line-height: 40px;
    margin-top: 50px;
    margin-bottom: 25px;
  }
  .Heading-1 {
    color: #5c5c5c;
    font-size: 30px;
    font-weight: normal;
  }
  .Content {
    font-size: 20px;
    line-height: 40px;
  }
  .Highlight {
    color: #2563ff;
    font-weight: 700;
  }
  ul {
    margin-left: 20px;
  }
  li {
    list-style-type: disc;
  }
`;

export default ContentWrapper;