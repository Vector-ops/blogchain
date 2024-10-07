'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">blogchain documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-4c996867b84231eda5c231288ccd3c4743d74217d5d6b35389784a8e63f9d7c3bbe65280eb243500723f9881bbb916d659aee6553cab530f7c0d84547565b9c1"' : 'data-bs-target="#xs-controllers-links-module-AppModule-4c996867b84231eda5c231288ccd3c4743d74217d5d6b35389784a8e63f9d7c3bbe65280eb243500723f9881bbb916d659aee6553cab530f7c0d84547565b9c1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-4c996867b84231eda5c231288ccd3c4743d74217d5d6b35389784a8e63f9d7c3bbe65280eb243500723f9881bbb916d659aee6553cab530f7c0d84547565b9c1"' :
                                            'id="xs-controllers-links-module-AppModule-4c996867b84231eda5c231288ccd3c4743d74217d5d6b35389784a8e63f9d7c3bbe65280eb243500723f9881bbb916d659aee6553cab530f7c0d84547565b9c1"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-4c996867b84231eda5c231288ccd3c4743d74217d5d6b35389784a8e63f9d7c3bbe65280eb243500723f9881bbb916d659aee6553cab530f7c0d84547565b9c1"' : 'data-bs-target="#xs-injectables-links-module-AppModule-4c996867b84231eda5c231288ccd3c4743d74217d5d6b35389784a8e63f9d7c3bbe65280eb243500723f9881bbb916d659aee6553cab530f7c0d84547565b9c1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-4c996867b84231eda5c231288ccd3c4743d74217d5d6b35389784a8e63f9d7c3bbe65280eb243500723f9881bbb916d659aee6553cab530f7c0d84547565b9c1"' :
                                        'id="xs-injectables-links-module-AppModule-4c996867b84231eda5c231288ccd3c4743d74217d5d6b35389784a8e63f9d7c3bbe65280eb243500723f9881bbb916d659aee6553cab530f7c0d84547565b9c1"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-605de686cf3c56b8ff9ec5576ad2fe4b61d787e1b20792f6e73b60e66938a9fa188b3a18a035a2237d12e79f4410481b7dfd002e7352951755f37f9fd10e9a35"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-605de686cf3c56b8ff9ec5576ad2fe4b61d787e1b20792f6e73b60e66938a9fa188b3a18a035a2237d12e79f4410481b7dfd002e7352951755f37f9fd10e9a35"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-605de686cf3c56b8ff9ec5576ad2fe4b61d787e1b20792f6e73b60e66938a9fa188b3a18a035a2237d12e79f4410481b7dfd002e7352951755f37f9fd10e9a35"' :
                                            'id="xs-controllers-links-module-AuthModule-605de686cf3c56b8ff9ec5576ad2fe4b61d787e1b20792f6e73b60e66938a9fa188b3a18a035a2237d12e79f4410481b7dfd002e7352951755f37f9fd10e9a35"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-605de686cf3c56b8ff9ec5576ad2fe4b61d787e1b20792f6e73b60e66938a9fa188b3a18a035a2237d12e79f4410481b7dfd002e7352951755f37f9fd10e9a35"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-605de686cf3c56b8ff9ec5576ad2fe4b61d787e1b20792f6e73b60e66938a9fa188b3a18a035a2237d12e79f4410481b7dfd002e7352951755f37f9fd10e9a35"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-605de686cf3c56b8ff9ec5576ad2fe4b61d787e1b20792f6e73b60e66938a9fa188b3a18a035a2237d12e79f4410481b7dfd002e7352951755f37f9fd10e9a35"' :
                                        'id="xs-injectables-links-module-AuthModule-605de686cf3c56b8ff9ec5576ad2fe4b61d787e1b20792f6e73b60e66938a9fa188b3a18a035a2237d12e79f4410481b7dfd002e7352951755f37f9fd10e9a35"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostModule.html" data-type="entity-link" >PostModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PostModule-2f80a8db045d06a30facc9067d1e324c276993e5e2e097afd3c4e4d3ec8c59b9cf26de6d1b14d0a13c90c097b22582f7f9decb2401426952eee61731701bdd29"' : 'data-bs-target="#xs-controllers-links-module-PostModule-2f80a8db045d06a30facc9067d1e324c276993e5e2e097afd3c4e4d3ec8c59b9cf26de6d1b14d0a13c90c097b22582f7f9decb2401426952eee61731701bdd29"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostModule-2f80a8db045d06a30facc9067d1e324c276993e5e2e097afd3c4e4d3ec8c59b9cf26de6d1b14d0a13c90c097b22582f7f9decb2401426952eee61731701bdd29"' :
                                            'id="xs-controllers-links-module-PostModule-2f80a8db045d06a30facc9067d1e324c276993e5e2e097afd3c4e4d3ec8c59b9cf26de6d1b14d0a13c90c097b22582f7f9decb2401426952eee61731701bdd29"' }>
                                            <li class="link">
                                                <a href="controllers/PostController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostModule-2f80a8db045d06a30facc9067d1e324c276993e5e2e097afd3c4e4d3ec8c59b9cf26de6d1b14d0a13c90c097b22582f7f9decb2401426952eee61731701bdd29"' : 'data-bs-target="#xs-injectables-links-module-PostModule-2f80a8db045d06a30facc9067d1e324c276993e5e2e097afd3c4e4d3ec8c59b9cf26de6d1b14d0a13c90c097b22582f7f9decb2401426952eee61731701bdd29"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostModule-2f80a8db045d06a30facc9067d1e324c276993e5e2e097afd3c4e4d3ec8c59b9cf26de6d1b14d0a13c90c097b22582f7f9decb2401426952eee61731701bdd29"' :
                                        'id="xs-injectables-links-module-PostModule-2f80a8db045d06a30facc9067d1e324c276993e5e2e097afd3c4e4d3ec8c59b9cf26de6d1b14d0a13c90c097b22582f7f9decb2401426952eee61731701bdd29"' }>
                                        <li class="link">
                                            <a href="injectables/PostService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserModule-f15eabc1343a64640f348efe5091b4b81999d2af0212ff2eea55818ef4990768ba5d77ff9f064a6bcc003e271c365373fe1d750a5966fafa1e46be5d7c25c014"' : 'data-bs-target="#xs-controllers-links-module-UserModule-f15eabc1343a64640f348efe5091b4b81999d2af0212ff2eea55818ef4990768ba5d77ff9f064a6bcc003e271c365373fe1d750a5966fafa1e46be5d7c25c014"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-f15eabc1343a64640f348efe5091b4b81999d2af0212ff2eea55818ef4990768ba5d77ff9f064a6bcc003e271c365373fe1d750a5966fafa1e46be5d7c25c014"' :
                                            'id="xs-controllers-links-module-UserModule-f15eabc1343a64640f348efe5091b4b81999d2af0212ff2eea55818ef4990768ba5d77ff9f064a6bcc003e271c365373fe1d750a5966fafa1e46be5d7c25c014"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-f15eabc1343a64640f348efe5091b4b81999d2af0212ff2eea55818ef4990768ba5d77ff9f064a6bcc003e271c365373fe1d750a5966fafa1e46be5d7c25c014"' : 'data-bs-target="#xs-injectables-links-module-UserModule-f15eabc1343a64640f348efe5091b4b81999d2af0212ff2eea55818ef4990768ba5d77ff9f064a6bcc003e271c365373fe1d750a5966fafa1e46be5d7c25c014"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-f15eabc1343a64640f348efe5091b4b81999d2af0212ff2eea55818ef4990768ba5d77ff9f064a6bcc003e271c365373fe1d750a5966fafa1e46be5d7c25c014"' :
                                        'id="xs-injectables-links-module-UserModule-f15eabc1343a64640f348efe5091b4b81999d2af0212ff2eea55818ef4990768ba5d77ff9f064a6bcc003e271c365373fe1d750a5966fafa1e46be5d7c25c014"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUserParamDto.html" data-type="entity-link" >GetUserParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/MetaOptionsDto.html" data-type="entity-link" >MetaOptionsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePostDto.html" data-type="entity-link" >UpdatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePostParamDto.html" data-type="entity-link" >UpdatePostParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});