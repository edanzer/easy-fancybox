// const { createHigherOrderComponent } = wp.compose;
// const { InspectorControls } = wp.blockEditor;
// const { PanelBody, Button, ToggleControl } = wp.components;
// const { __ } = wp.i18n;
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button, ToggleControl } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

import './blocks.scss';

const withLightboxPanelControls = createHigherOrderComponent( ( BlockEdit ) => {
    return ( props ) => {
		const { name } = props;
		const isImageOrGalleryBlock = 'core/image' === name || 'core/gallery' === name;

		// firelight object passed via wp_localize_script
		const activeLightbox = firelight.activeLightbox;
		const isProLightbox = 'Pro Lightbox' === activeLightbox;
		const isProUser = firelight.isProUser;
		const settingsUrl = firelight.settingsUrl;

		if ( ! isImageOrGalleryBlock ) {
			return <BlockEdit { ...props } />
		}

		/*
		 Need exrtra conditional:
		 if ! isProUser -> show upgrade
		 if isProUser && notProLightbox -> tell them they can, provide linke
		 if isProUser and isProLightobx -> just show link to settings
		*/
        return (
            <>
                <BlockEdit key="edit" { ...props } />
                <InspectorControls>
                    <PanelBody className='fancybox-settings' title={ __( 'Lightbox' ) }>
						<p>
							{ __( 'You are using: ' ) }
							<span className='fancybox-active-lightbox'>{ activeLightbox }</span>
							{ '.' }
						</p>
						{
							! isProUser && (
								<>
									<ToggleControl
										label="Use Pro Lightbox?"
										checked={ false }
										disabled
									/>
									<p className="fancybox-upgrade-notice">{ __( 'Upgrade to enable Pro Lightbox.') }</p>
									<div className="fancybox-button-container">
										<Button
											variant="primary"
											className="fancybox-button"
											href='https://firelightwp.com/pro-lightbox'
											target='_blank'
										>
											{ __( 'See Demos' ) }
										</Button>
										{ ' ' }
										<Button
											variant="primary"
											className="fancybox-button"
											href='https://firelightwp.com/pro-lightbox/pricing'
											target='_blank'
										>
											{ __( 'Upgrade' ) }
										</Button>
									</div>
								</>
							)
						}
						{
							isProUser && ! isProLightbox && (
								<p>{ __( 'Notice: You have an active Easy Fancybox Pro license and can use the Pro Lightbox!') }</p>
							)
						}
						<div className="fancybox-settings-link">
							<Button
								variant="link"
								href={ settingsUrl }
								target='_blank'
							>
								{ __( 'View Lightbox Settings' ) }
							</Button>
						</div>		
					</PanelBody>
                </InspectorControls>
            </>
        );
    };
}, 'withMyPluginControls' );

wp.hooks.addFilter(
    'editor.BlockEdit',
    'lightpress/lightbox-panel',
    withLightboxPanelControls
);
