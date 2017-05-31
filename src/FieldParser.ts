﻿import {
    CSharpField,
    CSharpType
} from './Models';

import { ScopeHelper } from './ScopeHelper';
import { RegExHelper } from './RegExHelper';
import { TypeParser } from './TypeParser';

export class FieldParser {
    private scopeHelper = new ScopeHelper();
	private regexHelper = new RegExHelper();
	private typeParser = new TypeParser();

    constructor() {

    }

    parseFields(content: string) {
		var fields = new Array<CSharpField>();
		var scopes = this.scopeHelper.getCurlyScopes(content);
        
		for (var scope of scopes) {
            var matches = this.regexHelper.getMatches(
                scope.prefix,
                /((?:\w+\s)*)([^\s]+?)\s+(\w+?)\s*;/g);
			for (var match of matches) {
				var field = new CSharpField(match[2]);
				field.type = this.typeParser.parseType(match[1]);

				var modifiers = match[0] || "";
				field.isPublic = modifiers.indexOf("public") > -1;
                
				fields.push(field);

				console.log("Detected field", field);
            }

        }

        return fields;
    }
}