import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const PaginationBox = styled.div`
.di {
    display: block;
    text-align: -webkit-center;
}
 .pagination {
	display: flex;
	list-style: none;
	height: 40px;
	border: 1px solid black;
	border-radius: 5px;
	width: fit-content;
	align-items: center;
	padding: 0;
	margin-top: 40px;

	li {
		a {
			display: flex;
			align-items: center;
			height: 100%;
			padding: 0 10px;
			cursor: pointer;

			&:hover {
				text-decoration: underline;
			}
		}

		&.active {
			a {
				font-weight: bold;
				text-decoration: underline;
				pointer-events: none;
			}
		}
	}
}`

export default PaginationBox;