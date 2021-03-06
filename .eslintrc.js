module.exports = {
	env: {
		es2020: true,
	},
	extends: ["react-app", "plugin:jsx-a11y/recommended", "plugin:cypress/recommended", "prettier"],
	plugins: ["jsx-a11y", "cypress"],
	rules: {
		"import/no-anonymous-default-export": "error",
		"import/no-webpack-loader-syntax": "off",
		"react/react-in-jsx-scope": "off", // React is always in scope with Blitz
		"jsx-a11y/anchor-is-valid": "off", //Doesn't play well with Blitz/Next <Link> usage
		indent: ["error", "tab"],
		"jsx-a11y/accessible-emoji": "off",
		"no-console": ["error", { allow: ["warn", "error"] }],
		"no-debugger": "error",
		"jsx-a11y/no-onchange": "off",
		"jsx-a11y/no-static-element-interactions": "off",
		"jsx-a11y/click-events-have-key-events": "off",
	},
}
