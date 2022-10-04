<?php
/*
Plugin Name: Easy FancyBox
Plugin URI: http://status301.net/wordpress-plugins/easy-fancybox/
Description: Easily enable the FancyBox 3 jQuery extension on all media file links. Also supports iFrame and inline content.
Text Domain: easy-fancybox
Domain Path: languages
Version: 2.0-alpha3
Author: RavanH
Author URI: http://status301.net/
*/

/**
 * Copyright 2022 RavanH
 * https://status301.net/
 * mailto: ravanhagen@gmail.com

 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 */

if ( ! defined( 'ABSPATH' ) ) exit;

/**************
 * CONSTANTS
 **************/

define( 'EASY_FANCYBOX_VERSION', '2.0-alpha3' );
define( 'FANCYBOX_VERSION', '1.5' );
define( 'FANCYBOX_2_VERSION', '2.2.0' );
define( 'FANCYBOX_3_VERSION', '3.5.7' );
define( 'MOUSEWHEEL_VERSION', '3.1.13' );
define( 'EASING_VERSION', '1.4.1' );
define( 'METADATA_VERSION', '2.22.1' );
define( 'EASY_FANCYBOX_DIR', dirname( __FILE__ ) );

/**************
 *   CLASSES
 **************/

require_once EASY_FANCYBOX_DIR . '/inc/class-easyfancybox.php';
new easyFancyBox();

if ( is_admin() ) {
    require_once EASY_FANCYBOX_DIR . '/inc/class-easyfancybox-admin.php';
    new easyFancyBox_Admin();
}
