import {__, _x} from '@wordpress/i18n';
import {
    GradientPicker,
    PanelBody,
    SelectControl,
    ColorPalette,
    ToggleControl,
    __experimentalUnitControl as UnitControl,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
    TextControl,
    BaseControl,
    Button,
    RangeControl,
} from '@wordpress/components';
import {InnerBlocks, useBlockProps, InspectorControls, useSetting, MediaUpload} from '@wordpress/block-editor';
import {useState} from '@wordpress/element';

import './editor.scss';

export default function Edit({attributes, setAttributes, clientId}) {
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
        backgroundImageOpacity,
        blockId
    } = attributes;
    const [isModalOpen, setIsModalOpen] = useState(false);  // New state for modal visibility

    const colors = useSetting('color.palette');
    
    if (blockId === '') {
        setAttributes({blockId: clientId});
    }

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
        backgroundImageStyle.backgroundImage = `url(${backgroundImage})`
        backgroundImageStyle.opacity = backgroundImageOpacity / 100

    }

    const blockProps = useBlockProps({
        className: `modal-content`,
    });
    return (
        <>
			<InspectorControls>
				<PanelBody
                    title={__('Background Options', 'modal-block')}
                    initialOpen={true}
                >
					<SelectControl
                        label="Background Color Options"
                        value={backgroundOption}
                        onChange={(selectedOption) => setAttributes({backgroundOption: selectedOption})}
                        options={[
                            {
                                label: 'Select an Option',
                                value: ''
                            },
                            {
                                label: 'Color',
                                value: 'background-color'
                            },
                            {
                                label: 'Gradient',
                                value: 'background-gradient'
                            }
                        ]}
                    />
                    {backgroundOption === 'background-color' &&
                        <ColorPalette
                            colors={colors}
                            value={backgroundColor}
                            onChange={(newColor) => setAttributes({backgroundColor: newColor})}
                        />
                    }
                    {backgroundOption === "background-gradient" &&
                        <GradientPicker
                            value={backgroundGradient}
                            onChange={(newGradient) => setAttributes({backgroundGradient: newGradient})}
                            gradients={[
                                {
                                    name: 'JShine',
                                    gradient:
                                        'linear-gradient(135deg,#12c2e9 0%,#c471ed 50%,#f64f59 100%)',
                                    slug: 'jshine',
                                },
                                {
                                    name: 'Moonlit Asteroid',
                                    gradient:
                                        'linear-gradient(135deg,#0F2027 0%, #203A43 0%, #2c5364 100%)',
                                    slug: 'moonlit-asteroid',
                                },
                                {
                                    name: 'Rastafarie',
                                    gradient:
                                        'linear-gradient(135deg,#1E9600 0%, #FFF200 0%, #FF0000 100%)',
                                    slug: 'rastafari',
                                },
                            ]}
                        />
                    }
                    <RangeControl
                        label={__('Background Opacity', 'modal-block')}
                        value={backgroundOpacity}
                        onChange={(newOpacity) => setAttributes({backgroundOpacity: newOpacity})}
                        min={0}
                        max={100}
                    />
                    <BaseControl
                        label={__('Background Image', 'modal-block')}
                    >
                        <MediaUpload
                            onSelect={(newImage) => setAttributes({backgroundImage: newImage.url})}
                            allowedTypes={['image']}
                            value={backgroundImage}
                            render={({open}) => (
                                <Button
                                    className={!backgroundImage ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview'}
                                    onClick={open}
                                >
                                    {!backgroundImage && __('Set background image', 'modal-block')}
                                    {!!backgroundImage &&
                                        <img src={backgroundImage} alt={__('Background image', 'modal-block')}/>}
                                </Button>
                            )}
                        />
                    </BaseControl>
                      <RangeControl
                          label={__('Background Image Opacity', 'modal-block')}
                          value={backgroundImageOpacity}
                          onChange={(newBackgroundImageOpacity) => setAttributes({backgroundImageOpacity: newBackgroundImageOpacity})}
                          min={0}
                          max={100}
                      />
				</PanelBody>
                <PanelBody
                    title={__('Close Button', 'modal-block')}
                    initialOpen={false}
                >
                     <ToggleControl
                         label="Show"
                         checked={showCloseButton}
                         onChange={() => setAttributes({showCloseButton: !showCloseButton})}
                     />
                      <ColorPalette
                          colors={colors}
                          value={closeButtonColor}
                          onChange={(newColor) => setAttributes({closeButtonColor: newColor})}
                      />
                </PanelBody>
                <PanelBody
                    title={__('Open Button', 'modal-block')}
                    initialOpen={false}
                >
                     <ToggleControl
                         label="Show"
                         checked={showOpenButton}
                         onChange={() => setAttributes({showOpenButton: !showOpenButton})}
                     />
                    <TextControl
                        label="Label"
                        onChange={(newLabel) => setAttributes({buttonLabel: newLabel})}
                        value={buttonLabel}
                    />
                     <SelectControl
                         label="Style"
                         value={buttonStyle}
                         onChange={(newStyle) => setAttributes({buttonStyle: newStyle})}
                         options={[
                             {
                                 label: 'Fill',
                                 value: 'fill'
                             },
                             {
                                 label: 'Outline',
                                 value: 'outline'
                             }
                         ]}
                     />
                     <UnitControl
                         label="Width"
                         onChange={(newWidth) => setAttributes({buttonWidth: newWidth})}
                         value={buttonWidth}
                     />
                    <ToggleGroupControl
                        label="Alignment"
                        onChange={(newAlignment) => setAttributes({buttonAlignment: newAlignment})}
                        value={buttonAlignment}
                    >
                      <ToggleGroupControlOption
                          label="Left"
                          value="justification-left"
                      />
                      <ToggleGroupControlOption
                          label="Center"
                          value="justification-center"
                      />
                      <ToggleGroupControlOption
                          label="Right"
                          value="justification-right"
                      />
                    </ToggleGroupControl>
                </PanelBody>
                  <PanelBody
                      title={__('Modal Options', 'modal-block')}
                      initialOpen={false}
                  >
                  <UnitControl
                      label="Max Width"
                      onChange={(newMaxWidth) => setAttributes({modalMaxWidth: newMaxWidth})}
                      value={modalMaxWidth}
                  />
                    <UnitControl
                        label="Max Height"
                        onChange={(newMaxHeight) => setAttributes({modalMaxHeight: newMaxHeight})}
                        value={modalMaxHeight}
                    />
                </PanelBody>
			</InspectorControls>
			<div>
				{showOpenButton && (
                    <div className={`wp-block-buttons is-content-${buttonAlignment} is-layout-flex `}>
                        <div className={`wp-block-button is-style-${buttonStyle}`}>
                         <button
                             data-block={blockId}
                             className={"modal-block-open-button wp-block-button__link wp-element-button"}
                             style={{width: buttonWidth,}}
                             onClick={() => setIsModalOpen(!isModalOpen)}
                         >{buttonLabel}</button>
                        </div>
                    </div>
                )}
                {isModalOpen && (
                    <div className="modal" data-block={blockId}>
                         <div className={`modal-overlay-img`}
                              style={backgroundImageStyle}
                         ></div>
                        <div className={`modal-overlay`}
                             style={backgroundStyle}
                        ></div>
                        <div {...blockProps}>
                            <InnerBlocks/>
                        </div>
                    </div>
                )}
			</div>
		</>
    );
}
