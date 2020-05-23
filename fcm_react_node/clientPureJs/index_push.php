<?php
	require_once('../../wp-load.php');
    
    $upload_dir  = wp_upload_dir();
    $upload_path = $uploads['baseurl'];

	$stdb = new wpdb('stwpcms','HOT#221torgta','wp_singtao_master_cms','singtao-wpcms-master-rep01.ckspqtnsilx0.us-east-1.rds.amazonaws.com');
    //$mydb->show_errors();
    

    #取slider的文章
    //$tag_term_taxonomy_id  = 1694249; //$tag_names = "singtop";
    $sql = "SELECT tt.term_taxonomy_id FROM wp_terms AS t INNER JOIN wp_term_taxonomy AS tt ON t.term_id = tt.term_id WHERE tt.taxonomy IN ('post_tag') AND t. NAME='singtop'";
    $tag_term_taxonomy_id = $stdb->get_var($sql); 

    $link_format = $stdb->get_var("SELECT option_value FROM wp_options where option_name = 'permalink_structure'"); 

    //取文章：前10篇是tag=singtop
	$sql = "SELECT p1.ID,p1.post_title,p1.post_name, wm2.meta_value as image_url, CONCAT('https://www.singtao.ca', REPLACE(REPLACE(REPLACE(REPLACE(REPLACE('{$link_format}', '%post_id%', p1.ID), '%year%', DATE_FORMAT(p1.post_date, '%Y')), '%monthnum%', DATE_FORMAT(p1.post_date, '%m')), '%day%', DATE_FORMAT(p1.post_date, '%d')), '%postname%', CONCAT(p1.post_name,'-st-topic')) ) AS permalink FROM wp_posts p1 LEFT JOIN wp_postmeta wm1 ON ( wm1.post_id = p1.id AND wm1.meta_value IS NOT NULL AND wm1.meta_key = '_thumbnail_id') LEFT JOIN wp_postmeta wm2 ON (wm1.meta_value = wm2.post_id AND wm2.meta_key = '_wp_attached_file' AND wm2.meta_value IS NOT NULL) WHERE p1.ID in ( SELECT t.object_id from wp_term_relationships t WHERE t.term_taxonomy_id in(".$tag_term_taxonomy_id.")) and p1.post_status='publish' AND p1.post_type='post' ORDER BY p1.post_date DESC limit 10";
    $rows1 = $stdb->get_results($sql);    
    #slider 结束
    
    #底部最新优惠文章
    $ids = array();
    foreach($rows1 as $row1){ 
        $ids[] = $row1->ID;
    }
    $ids = implode(",", $ids);
    
    //$cat_ids = "1690369";	 // singtao 星CLUB
    $term_taxonomy_id = '1690370';
	$sql = "SELECT p1.ID,p1.post_title,p1.post_name, wm2.meta_value as image_url, CONCAT('https://www.singtao.ca', REPLACE(REPLACE(REPLACE(REPLACE(REPLACE('{$link_format}', '%post_id%', p1.ID), '%year%', DATE_FORMAT(p1.post_date, '%Y')), '%monthnum%', DATE_FORMAT(p1.post_date, '%m')), '%day%', DATE_FORMAT(p1.post_date, '%d')), '%postname%', CONCAT(p1.post_name,'-st-topic')) ) AS permalink FROM wp_posts p1 LEFT JOIN wp_postmeta wm1 ON ( wm1.post_id = p1.id AND wm1.meta_value IS NOT NULL AND wm1.meta_key = '_thumbnail_id') LEFT JOIN wp_postmeta wm2 ON (wm1.meta_value = wm2.post_id AND wm2.meta_key = '_wp_attached_file' AND wm2.meta_value IS NOT NULL) WHERE p1.ID in ( SELECT t.object_id from wp_term_relationships t WHERE t.term_taxonomy_id in({$term_taxonomy_id})) and p1.ID not in({$ids}) and p1.post_status='publish' AND p1.post_type='post' ORDER BY p1.post_date DESC limit 24";
    $rows2 = $stdb->get_results($sql);
    #底部最新优惠结束


	$mydb = new wpdb('aitmysqluser','ait898123','mxiiiccue','mxiiiccue.ckspqtnsilx0.us-east-1.rds.amazonaws.com');
    //$mydb->show_errors();

    //取文章：每个tag取1篇
    $arr_tags = array('B1','B2','B3','B4','C1','C2','C3','C4','C5','C6','C7','C8','C9','D1','D2','D3','D4','D5','D6','D7','D8','D9','D10','D11','D12','D13','D14','D15','D16');
    $str_tags = "'". implode("','", $arr_tags) . "'";
    $sql = "SELECT UPPER(t.NAME) as tag_name, tt.term_taxonomy_id as tag_id FROM wp_terms AS t INNER JOIN wp_term_taxonomy AS tt ON t.term_id = tt.term_id WHERE tt.taxonomy IN ('post_tag') AND UPPER(t.NAME) in($str_tags)";
    $tag_rows = $mydb->get_results($sql); 
        
    $rowsB = $rowsC = $rowsD = array();
    foreach($tag_rows as $tag){
        $tag_term_taxonomy_id = $tag->tag_id;
        $sql = 'SELECT p1.ID,p1.post_title,p1.post_name, wm2.meta_value as image_url FROM wp_posts p1 LEFT JOIN wp_postmeta wm1 ON ( wm1.post_id = p1.id AND wm1.meta_value IS NOT NULL AND wm1.meta_key = "_thumbnail_id") LEFT JOIN wp_postmeta wm2 ON (wm1.meta_value = wm2.post_id AND wm2.meta_key = "_wp_attached_file" AND wm2.meta_value IS NOT NULL) WHERE p1.ID in ( SELECT t.object_id from wp_term_relationships t WHERE t.term_taxonomy_id in('.$tag_term_taxonomy_id.')) and p1.post_status="publish" AND p1.post_type="post" ORDER BY p1.post_date DESC limit 1';
		//$sql = 'SELECT p1.ID,p1.post_title,p1.post_name, wm2.meta_value as image_url FROM wp_posts p1 LEFT JOIN wp_postmeta wm1 ON ( wm1.post_id = p1.id AND wm1.meta_value IS NOT NULL AND wm1.meta_key = "_thumbnail_id") LEFT JOIN wp_postmeta wm2 ON (wm1.meta_value = wm2.post_id AND wm2.meta_key = "_wp_attached_file" AND wm2.meta_value IS NOT NULL) WHERE p1.ID in ( SELECT t.object_id from wp_term_relationships t WHERE t.term_taxonomy_id in('.$tag_term_taxonomy_id.')) and p1.post_type="post" ORDER BY p1.post_date DESC limit 1';
		$row = $mydb->get_row($sql);
        if($row){
            
            //取highlight_options
            
            $sql = "SELECT t.name FROM wp_terms AS t 
INNER JOIN wp_term_taxonomy AS tt ON (tt.term_id = t.term_id) 
INNER JOIN wp_term_relationships AS tr ON (tr.term_taxonomy_id = tt.term_taxonomy_id) 
WHERE tt.taxonomy IN ('highlight_options') AND tr.object_id ='$row->ID'";
            $row->highlight_options = $mydb->get_var($sql);
            $row->tag_name = $tag->tag_name;
            
            if( in_array($tag->tag_name, array('B1','B2','B3','B4') ))
                $rowsB[] = $row;
            else if( in_array($tag->tag_name, array('C1','C2','C3','C4','C5','C6','C7','C8','C9') ))
                $rowsC[] = $row;
            else if( in_array($tag->tag_name, array('D1','D2','D3','D4','D5','D6','D7','D8','D9','D10','D11','D12','D13','D14','D15','D16') ))
                $rowsD[] = $row;
        }
    }

    
?>
<!DOCTYPE html>
<html dir="ltr" lang="en-US">
<head>

	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<meta name="author" content="星CLUB" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" /> 

	<!-- Stylesheets
	============================================= -->
	<link href="https://fonts.googleapis.com/css?family=Lato:300,400,400i,700%7CMontserrat:300,400,500,600,700%7CMerriweather:300,400,300i,400i" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" href="css/bootstrap.css" type="text/css" />
	<link rel="stylesheet" href="style.css" type="text/css" />
	<link rel="stylesheet" href="css/dark.css" type="text/css" />
	<link rel="stylesheet" href="css/swiper.css" type="text/css" />

	<!-- shop Demo Specific Stylesheet -->
	<link rel="stylesheet" href="demos/shop/shop.css" type="text/css" />
	<link rel="stylesheet" href="demos/shop/css/fonts.css" type="text/css" />
	<!-- / -->

	<link rel="stylesheet" href="css/font-icons.css" type="text/css" />
	<link rel="stylesheet" href="css/animate.css" type="text/css" />
	<link rel="stylesheet" href="css/magnific-popup.css" type="text/css" />

	<link rel="stylesheet" href="css/responsive.css?ver=2" type="text/css" />

	<link rel="stylesheet" href="css/colors.php?color=000000" type="text/css" />

	<link rel="icon" type="image/x-icon" href="https://www.singtao.ca/deals/singclub_icon_144x144.png"/>
	<link rel="apple-touch-icon" href="https://www.singtao.ca/deals/singclub_icon_144x144.png"/>

	<!-- Document Title
	============================================= -->
	<title>星Club - Chinese New Year - 中國新年特價打折</title>
	<meta name="description" content="星Club - Chinese New Year - 中國新年特價打折">
	<meta property="keywords" content="星Club,Chinese New Year,中國新年特價打折">
	<meta property="og:type" content="article">
	<meta property="og:image" content="https://www.singtao.ca/deals/singclub_icon_144x144.png"/>
	<meta property="og:site_name" content="星Club - Chinese New Year - 中國新年特價打折"/>
	<meta property="og:title" content="星Club - Chinese New Year - 中國新年特價打折"/>
	<meta property="og:description" content="星Club - Chinese New Year - 中國新年特價打折"/>
	<meta property="og:url" content="https://www.singtao.ca/deals/boxing/"/>
	<meta property="og:image:url" content="https://www.singtao.ca/deals/singclub_icon_144x144.png"/>
	<meta property="og:image:width" content="144"/>
	<meta property="og:image:height" content="144"/>
	<meta property="og:locale" content="en_CA"/>
	
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P6DZXK');</script>
<!-- End Google Tag Manager -->

</head>

<body class="stretched">
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P6DZXK"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->	

	<!-- Document Wrapper
	============================================= -->
	<div id="wrapper-new" class="clearfix">
		
		<!-- Header
		============================================= -->
		<header id="header" class="full-header clearfix">

			<div id="header-wrap">

				<div class="container clearfix" style="background: url('demos/shop/images/Sing-Club-bg.png') no-repeat center;">

					<!-- Logo
					============================================= -->
					<div class="col-md-12" style="text-align:center;">
						<a href="index.php"><img src="demos/shop/images/logo.png" alt="星Club Logo"></a>
					</div>

				</div>

			</div>

		</header><!-- #header end -->

		<!-- Content
		============================================= -->
		<section id="content">

			<div class="content-wrap" style="padding-top:30px;">  

				<div class="container clearfix">
					
					<div id="oc-products" class="owl-carousel products-carousel carousel-widget" data-margin="20" data-loop="true" data-autoplay="5000" data-nav="true" data-pagi="false" data-items-xs="2" data-items-sm="2" data-items-md="3" data-items-lg="4" data-items-xl="4">

						<?php foreach($rows1 as $row){ 
                            if( empty($row->image_url) ) continue;
                            
                            $url = $row->permalink;
                            $image_url = 'https://media.singtao.ca/wp-content/uploads/master_sandbox/'.$row->image_url ; 

						?>
						
							<!-- Shop Items -->
							<div class="oc-item">
								<div class="product iproduct clearfix">
									<a href="<?php echo $url; ?>" target="_blank">
										<div class="product-image" style="background:url(<?php echo $image_url; ?>) center center;height:0;padding-top:calc(300/300*100%);background-position:50% 50%; background-size:cover;"></div>
									</a>
									<div class="product-desc">
										<div class="product-title mb-1"><a href="<?php echo $url; ?>" target="_blank"><?php echo $row->post_title; ?></a></div>
									</div>
								</div>
							</div>
							
						<?php } ?>
						
					</div>

					<!-- Shop Categories
					============================================= -->
					<div class="fancy-title title-dotted-border-red title-center mb-4">
						<h2><span class="text-danger"><span style="color:#001954">星CLUB</span> 精選推介</span></h2>
					</div>

					<div class="row shop-categories clearfix">
                    
                        <!-- B tags -->

                    <?php 
                    $ii = 0;
                    foreach($rowsB as $rowB){ 
                        
                        if( ++$ii==4 ) break;
                        
                        $url = 'https://ccue.singtao.ca/toronto/%E6%98%9Fclub/'.$rowB->post_name;
                        //$image_url = 'http://ccue.singtao.ca/wp-content/uploads/'.str_replace( array(".jpg",".jpeg",".png"), array("_0.jpg","_0.jpeg","_0.png"),$row->image_url ); 
                        $image_url = 'https://mxiiimedia.ccue.ca/wp-content/uploads/'.$rowB->image_url ; 
                    ?>						
						<div class="col-lg-6">
							<a id="st_blackfriday" target="_blank" href="<?php echo $url; ?>" style="background: url(<?php echo $image_url; ?>) no-repeat center center; background-size: 100% 100%; height:350px;">
								<div class="vertical-middle dark center">
									<div class="heading-block nomargin noborder">
										<h3 class="nott t600 ls0" style="margin:0 20px;"><?php echo $rowB->post_title; ?></h3>
									</div>
								</div>
                                
                            <?php if($rowB->highlight_options == "星CLUB之選"){ ?>
								<div class="sale-flash bg-primary">星CLUB之選</div>
                            <?php }else if($rowB->highlight_options == "新上架"){ ?>
                                <div class="sale-flash bg-warning">新上架</div>
                            <?php }else if($rowB->highlight_options == "#1熱賣"){ ?>
                                <div class="sale-flash bg-danger">#1 熱賣</div>
                            <?php } ?>
                                
							</a>
						</div>
							
						<?php } ?>     

                        <div class="col-lg-6">
							<a id="st_blackfriday" target="_blank" href="https://www.singtao.ca/deals/blackfriday/ihelp/index.php" style="background: url('demos/shop/images/categories/27.jpg') no-repeat center right; background-size: 100% 100%; height:350px;">
								<div class="vertical-middle dark center" style="position: absolute; top: 50%; width: 100%; padding-top: 0px; padding-bottom: 0px; margin-top: -58.415px;">
									<div class="heading-block nomargin noborder">
										<h3 class="nott t600 ls0">iHelp隨身保<br>專業保安團隊 高科技全方位守護<br>一個按鈕 保你安全！</h3>
									</div>
								</div>
								<div class="sale-flash bg-primary">星CLUB之選</div>
							</a>
						</div>                        

                        <!-- B tags end -->
                        
                        <!-- C tags -->

                   <?php foreach($rowsC as $rowC){ 
                        
                        $url = 'https://ccue.singtao.ca/toronto/%E6%98%9Fclub/'.$rowC->post_name;
                        //$image_url = 'http://ccue.singtao.ca/wp-content/uploads/'.str_replace( array(".jpg",".jpeg",".png"), array("_0.jpg","_0.jpeg","_0.png"),$row->image_url ); 
                        $image_url = 'https://mxiiimedia.ccue.ca/wp-content/uploads/'.$rowC->image_url ; 
                    ?>						                        
						<div class="col-lg-4">
							<a id="st_blackfriday" target="_blank" href="<?php echo $url; ?>" style="background: url(<?php echo $image_url; ?>) no-repeat center center; background-size: 100% 100%; background-size: cover;">
								<div class="vertical-middle dark center">
									<div class="heading-block nomargin noborder">
										<h3 class="nott t600 ls0" style="margin:0 20px;"><?php echo $rowC->post_title; ?></h3>
									</div>
								</div>
                                
                            <?php if($rowC->highlight_options == "星CLUB之選"){ ?>
								<div class="sale-flash bg-primary">星CLUB之選</div>
                            <?php }else if($rowC->highlight_options == "新上架"){ ?>
                                <div class="sale-flash bg-warning">新上架</div>
                            <?php }else if($rowC->highlight_options == "#1熱賣"){ ?>
                                <div class="sale-flash bg-danger">#1 熱賣</div>
                            <?php } ?>
                                
							</a>
						</div>
							
						<?php } ?>                        

                        <!-- C tags end -->

                        <!-- D tags -->		
                        
                   <?php foreach($rowsD as $rowD){ 
                        
                        $url = 'https://ccue.singtao.ca/toronto/%E6%98%9Fclub/'.$rowD->post_name;
                        //$image_url = 'http://ccue.singtao.ca/wp-content/uploads/'.str_replace( array(".jpg",".jpeg",".png"), array("_0.jpg","_0.jpeg","_0.png"),$row->image_url ); 
                        $image_url = 'https://mxiiimedia.ccue.ca/wp-content/uploads/'.$rowD->image_url ; 
                    ?>						                        
						<div class="col-lg-3" data-tag="<?php echo $rowD->tag_name; ?>">
							<a id="st_blackfriday" target="_blank" href="<?php echo $url; ?>" style="background: url(<?php echo $image_url; ?>) no-repeat center center; background-size: 100% 100%; background-size: cover;">
								<div class="vertical-middle dark center">
									<div class="heading-block nomargin noborder">
										<h4 class="nott t600 ls0" style="margin:0 20px;"><?php echo $rowD->post_title; ?></h4>
									</div>
								</div>
                                
                            <?php if($rowD->highlight_options == "星CLUB之選"){ ?>
								<div class="sale-flash bg-primary">星CLUB之選</div>
                            <?php }else if($rowD->highlight_options == "新上架"){ ?>
                                <div class="sale-flash bg-warning">新上架</div>
                            <?php }else if($rowD->highlight_options == "#1熱賣"){ ?>
                                <div class="sale-flash bg-danger">#1 熱賣</div>
                            <?php } ?>
                                
							</a>
						</div>
							
						<?php } ?>                        
                        
                        <!-- D tags end -->

					</div>

				<div class="clear"></div>
				
				<!-- New Arrivals Men
				============================================= -->
				<div class="container clearfix latest_deals">

					<div class="fancy-title title-dotted-border topmargin-sm mb-4 title-center">
						<h2>最 新 優 惠</h2>
					</div>

					<div class="row grid-6">

						
                    <?php foreach($rows2 as $row){ 
                            if( empty($row->image_url) ) continue;
                            
                            $url = $row->permalink;
                            $image_url = 'https://media.singtao.ca/wp-content/uploads/master_sandbox/'.$row->image_url ; 

                    ?>   
                        <!-- Shop Item -->
						<div class="col-lg-2 col-md-3 col-6 px-2">
							<ul class="clearfixx">
								<li class="imgcrop">
									<div class="aspect_1_1">
										<a href="<?php echo $url; ?>" target="_blank"><img src="<?php echo $image_url; ?>" alt="Image 1"></a>
									</div>
								</li>
							</ul>	
							<div class="product-desc">
								<div class="product-title mb-1"><a class="twoline" target="_blank" href="<?php echo $url; ?>"><?php echo $row->post_title; ?></a></div>
							</div>
						</div>
					
                    <?php } ?>

					</div>

				</div>
				
				<div class="clearfix">
					<!-- Brands
					============================================= -->
					<div class="row mt-5 clearfix">
						<div class="col-12">
							<div class="fancy-title title-dotted-border an title-center mb-4">
								<h3>我們的合作夥伴 <span class="text-danger">共贏</span></h3>
							</div>

							<ul class="clients-grid grid-8 nobottommargin clearfix">
								<li><a id="st_blackfriday" href="http://www.kqzyfj.com/click-8442219-12727793"><img src="images/clients/logo/stuart_weitzman.png" alt="Clients"></a></li>
								<li><a id="st_blackfriday" href="https://click.linksynergy.com/fs-bin/click?id=6i/QZg/AgdU&offerid=523055.26&subid=0&type=4"><img src="images/clients/logo/coach.png" alt="Clients"></a></li>
								<li><a id="st_blackfriday" href="http://www.kqzyfj.com/click-8442219-13675579"><img src="images/clients/logo/michael_kors.png" alt="Clients"></a></li>
								<li><a id="st_blackfriday" href="https://click.linksynergy.com/fs-bin/click?id=6i/QZg/AgdU&offerid=620778.3&subid=0&type=4"><img src="images/clients/logo/ugg.png" alt="Clients"></a></li>
								<li><a id="st_blackfriday" href="http://lancomeca.ue8cqz.net/c/1266533/391604/5685"><img src="images/clients/logo/lancome.png" alt="Clients"></a></li>
								<li><a id="st_blackfriday" href="https://adidas-canada.zstn.net/c/1266533/358683/5280" id="358683"><img src="images/clients/logo/adidas.png" alt="Clients"></a></li>
								<li><a id="st_blackfriday" href="https://click.linksynergy.com/fs-bin/click?id=6i/QZg/AgdU&offerid=565943.5&subid=0&type=4"><img src="images/clients/logo/hudson_bay.png" alt="Clients"></a></li>
								<li><a id="st_blackfriday" href="http://www.anrdoezrs.net/click-8442219-12209801"><img src="images/clients/logo/mackage.png" alt="Clients"></a></li>
								<li><a id="st_blackfriday" href="https://shiseido.u24his.net/c/1266533/673171/10395"><img src="images/clients/logo/shiseido.png" alt="Clients"></a></li>
								<li><a id="st_blackfriday" href="https://click.linksynergy.com/fs-bin/click?id=6i/QZg/AgdU&offerid=702747.64&subid=0&type=4"><img src="images/clients/logo/ecco.png" alt="Clients"></a></li>
								<li><a id="st_blackfriday" href="http://www.anrdoezrs.net/click-8442219-13061069"><img src="images/clients/logo/ssense.png" alt="Clients"></a></li>
								<li><a id="st_blackfriday" href="https://click.linksynergy.com/fs-bin/click?id=6i/QZg/AgdU&offerid=248780.10000814&type=4&subid=0"><img src="images/clients/logo/roots.png" alt="Clients"></a></li>
								<li><a id="st_blackfriday" href="https://click.linksynergy.com/fs-bin/click?id=6i/QZg/AgdU&offerid=416222.214&subid=0&type=4"><img src="images/clients/logo/nike.png" alt="Clients"></a></li>
								<li><a id="st_blackfriday" href="https://www.avantlink.com/click.php?tt=ml&amp;ti=483341&amp;pw=232749"><img src="images/clients/logo/columbia.png" alt="Clients"></a></li>
								<li><a id="st_blackfriday" href="http://reebok-canada.fzqh.net/c/1266533/358696/5281"><img src="images/clients/logo/reebok.png" alt="Clients"></a></li>
								<li><a id="st_blackfriday" href="https://bestbuyca.o93x.net/c/1266533/644450/10221"><img src="images/clients/logo/bestbuy.png" alt="Clients"></a></li>								
							</ul>
						</div>
					</div>

				</div>

				<div class="clear"></div>

				<div class="clear" style="padding-top:30px;"></div>

				<div class="clearfix">
				
					<!-- Newsletter
					============================================= -->
					<div class="row">

						<div class="col-lg-2 col-md-12">
							<div class="widget clearfix">
							</div>
						</div>

						<div class="col-lg-8 col-md-12">
							<div class="widget clearfix">
								<h2 class="ls0 mb-3 nott">訂閱我們的電子快訊</h2>
								<div class="widget subscribe-widget mt-2 clearfix">
									<p class="mb-4"><strong>訂閱</strong> 星島旗下集團的電子快訊，每個周三與周五您將會收到：最新特價情報 | 吃喝玩樂好去處 | 熱點新聞。 </p>
									<div class="widget-subscribe-form-result"></div>
									<form id="widget-subscribe-form" action="" method="post" class="mt-1 nobottommargin d-flex">
										<input type="email" id="widget-subscribe-form-email" name="widget-subscribe-form-email" class="form-control sm-form-control required email" placeholder="輸入郵箱地址">
										<button onclick="ordersubmit()" class="button nott t400 ml-1 my-0" type="submit">提交訂閱</button>
									</form>
								</div>
							</div>
						</div>
							
						<div class="col-lg-2 col-md-12">
							<div class="widget clearfix">
							</div>
						</div>
						
					</div>				
				
				</div>

			</div>

		</section><!-- #content end -->

		<!-- Footer
		============================================= -->
		<footer id="footer" class="nobg noborder">

			<div class="container clearfix">

				<!-- Footer Widgets
				============================================= -->
				<div class="footer-widgets-wrap pb-3 border-bottom clearfix">
					
					<!-- Last Section
					============================================= -->
					<div class="section footer-stick bg-white nomargin py-3 border-bottom">
						<div class="container clearfix">
																					   
							<div class="row clearfix">
								<div class="col-lg-2 col-md-6">
									<div class="shop-footer-features mb-3 mb-lg-3"><img src="images/logos/logo_singtao_250x100.jpg" alt="www.singtao.ca" class="nobottommargin"></div>
								</div>
								<div class="col-lg-2 col-md-6">
									<div class="shop-footer-features mb-3 mb-lg-3"><img src="images/logos/logo_dushibuy_250x100.jpg" alt="www.singtao.ca" class="nobottommargin"></div>
								</div>
								<div class="col-lg-2 col-md-6">
									<div class="shop-footer-features mb-3 mb-lg-3"><img src="images/logos/logo_ccue_250x100.jpg" alt="www.singtao.ca" class="nobottommargin"></div>
								</div>
								<div class="col-lg-2 col-md-6">
									<div class="shop-footer-features mb-3 mb-lg-3"><img src="images/logos/logo_dushi_250x100.jpg" alt="www.singtao.ca" class="nobottommargin"></div>
								</div>
								<div class="col-lg-2 col-md-6">
									<div class="shop-footer-features mb-3 mb-lg-3"><img src="images/logos/logo_wechat_01_250x100.jpg" alt="www.singtao.ca" class="nobottommargin"></div>
								</div>
								<div class="col-lg-2 col-md-6">
									<div class="shop-footer-features mb-3 mb-lg-3"><img src="images/logos/logo_wechat_02_250x100.jpg" alt="www.singtao.ca" class="nobottommargin"></div>
								</div>
							</div>

						</div>
					</div>
					
				</div>
			</div>

			<!-- Copyrights
			============================================= -->
			<div id="copyrights" class="nobg">

				<div class="container clearfix">

					<div class="row justify-content-between align-items-center">
						<div class="col-md-12" style="text-align:center">
							Powered by Singtao Media Group
						</div>
					</div>

				</div>

			</div><!-- #copyrights end -->
			<!-- pop up button -->
			<div id="popup-button" style="position:fixed; bottom:2.3%; right:6%;z-index:3000;">

			</div>						 	 
		</footer><!-- #footer end -->

	</div><!-- #wrapper end -->

	<!-- Go To Top
	============================================= -->
	<div id="gotoTop" class="icon-line-arrow-up"></div>

	<!-- External JavaScripts
	============================================= -->
	<script src="js/jquery.js"></script>
	<script src="js/plugins.js"></script>
	<script src="js/imgcrop.js"></script>

	<!-- Footer Scripts
	============================================= -->
	<script src="js/functions.js"></script>

	<!-- ADD-ONS JS FILES -->
	<script src="//api.singtao.ca/counter/AITcounter.php?tag=st_blackfriday&id=st_blackfriday"></script>
	<script>
     function ordersubmit(){
		 var email= document.getElementById('widget-subscribe-form-email').value;
		 var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	     if(!regex.test(email)){
			 alert("請填寫正確的E-MAIL格式! Please enter the correct email format!");
			 return false;}
		 var orderurl='https://singtao.us19.list-manage.com/subscribe/post?u=829d9a69da134ea0fe2b115f1&id=16a147a28e&EMAIL=';
		 orderurl=orderurl+email;
	     window.open( orderurl, '_blank')
	 }
	</script>
	
	<!-- Firebase Push Notification JS FILES -->
	<script defer src="https://www.gstatic.com/firebasejs/7.4.0/firebase-app.js"></script>
	<script defer src="https://www.gstatic.com/firebasejs/7.4.0/firebase.js"></script>
	<script defer src="https://www.gstatic.com/firebasejs/7.4.0/firebase-auth.js"></script>
	<script src='https://cdn.firebase.com/js/client/2.2.1/firebase.js'></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.0/js/bootstrap.min.js" integrity="sha384-3qaqj0lc6sV/qpzrc1N5DC6i1VRn/HyX4qdPaiEFbn54VjQBEU341pvjz7Dv3n6P" crossorigin="anonymous"></script>
	<script defer src="./js/popup_button_20200514_7.js"></script>

	<script>
	$(document).ready(function() {
  		$('#exampleModal').modal('show');
		});
	</script>

</body>
</html>