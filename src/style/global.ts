import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`


	:root {

		--extension-width: 320px;
		--extension-height: 460px;

		--base-unit: 2px; 
		--primary-color: rgba(0, 0, 0, 1);
		--primary-background-color: rgba(255, 255, 255, 1);
		--primary-border-color: rgba(0, 0, 0, 1);
	}

	html {
		width: --extension-width;
		height: var(--extension-height);
	}

	html,
	body {
		margin: 0;
		padding: 0; 
		max-width: var(--extension-width);
	}

	body {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
			'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
			sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		outline: 1px solid red;
	}

	code {
		font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	* {
		box-sizing: border-box;
		/* outline: 1px solid red; */
	}


`;
