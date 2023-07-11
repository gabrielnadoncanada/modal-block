import {InnerBlocks, useBlockProps} from '@wordpress/block-editor';

export default function save({attributes}) {
    const {
        backgroundColor,
        backgroundGradient,
        closeButtonColor,
        showCloseButton,
        showOpenButton,
        buttonStyle,
        buttonLabel,
        buttonWidth,
        buttonAlignment,
        modalMaxWidth,
        modalMaxHeight,
        backgroundOption,
        backgroundImage,
        backgroundOpacity,
        blockId,
        backgroundImageOpacity
    } = attributes;

    let backgroundStyle = {
        opacity: backgroundOpacity / 100
    };

    let backgroundImageStyle = {};

    if (backgroundOption === 'background-color') {
        backgroundStyle.backgroundColor = backgroundColor;
    }

    if (backgroundOption === 'background-gradient') {
        backgroundStyle.backgroundImage = backgroundGradient;
    }

    if (backgroundImage) {
        backgroundImageStyle.backgroundImage = `url(${backgroundImage})`;
        backgroundImageStyle.opacity = backgroundImageOpacity / 100;
    }

    const blockProps = useBlockProps.save({
        className: `modal-content`,
        style: {
            maxWidth: modalMaxWidth,
            maxHeight: modalMaxHeight
        }
    });

    return (
        <div>
            {showOpenButton && (
                <div className={`wp-block-buttons is-content-${buttonAlignment} is-layout-flex `}>
                    <div className={`wp-block-button is-style-${buttonStyle}`}>
                        <button
                            data-block={blockId}
                            className={"modal-block-open-button wp-block-button__link wp-element-button"}
                            style={{width: buttonWidth}}
                        >{buttonLabel}</button>
                    </div>
                </div>
            )}
            <div data-block={blockId} className="modal">

				<div className={`modal-overlay-img`}
                     style={backgroundImageStyle}
                ></div>
                <div className={`modal-overlay`}
                     style={backgroundStyle}
                ></div>
				<div {...blockProps} >
					 {showCloseButton && (
                         <button type="button" data-block={blockId}
                                 className="modal-close-button components-button has-icon" aria-label="Fermer"><svg
                             style={{fill: closeButtonColor}}
                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36"
                             aria-hidden="true"
                             focusable="false"><path
                             d="M13 11.8l6.1-6.3-1-1-6.1 6.2-6.1-6.2-1 1 6.1 6.3-6.5 6.7 1 1 6.5-6.6 6.5 6.6 1-1z"></path></svg></button>
                     )}
                    <InnerBlocks.Content/>
				</div>
            </div>
        </div>
    );
}


