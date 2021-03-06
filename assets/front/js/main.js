jQuery(function($) {

	//#main-slider
	$(function(){
		$('#main-slider.carousel').carousel({
			interval: 8000
		});

		$('#btn-add').click(function(){
			$('#form-container').slideDown("slow");
			$('input[name="act"]').val("add");
			$('button[type="submit"]').text('Simpan');
			$(this).addClass('collapse');
		});

		$('#reset').click(function(){
			$('#form-container').slideUp("slow");
			$('#btn-add').removeClass('collapse');
			$('input[name="act"]').val("");
		});

		$('.btn-edit-form').on('click',function(e){
			$('#form-container').slideDown('slow');
			$('#btn-add').addClass('collapse');
		});
		function edit_form(){
			$('#form-container').slideDown('slow');
			$('#btn-add').addClass('collapse');
		}
		$('#mdl-login').on('show.bs.modal', function(){
			if($('.error').length > 0){
				$('label.error').remove();
			}
		});
		$('#login-form').validate({
			submitHandler: function(form) {
				form.submit();
			},
			debug: true,
			rules: {
				username: {
					required: true,
					minlength: 2
				},
				password: {
					required: true,
					minlength: 5
				}
			},
			messages: {
				username: {
					required: "Please enter a username",
					minlength: "Your username must consist of at least 2 characters"
				},
				password: {
					required: "Please provide a password",
					minlength: "Your password must be at least 5 characters long"
				}
			}

		});
		$('#form-signup').validate();
		//Pretty Photo
		$("a[rel^='prettyPhoto']").prettyPhoto({
			social_tools: false,
			iframe_markup: '<iframe src ="{path}" width="{width}" height="{height}" frameborder="no"></iframe>'
		});

		//File input
		if($("#identitas_file").length > 0){
			$("#identitas_file").fileinput({
				showUpload:false,
				previewFileType:'any',
				browseClass: "btn btn-sm btn-primary",
	        		browseLabel: "Cari File Identitas",
				removeClass: "btn btn-sm btn-danger",
	        		removeLabel: "Hapus",
				mainClass: "input-group-sm",
				showCaption: false
			});
		}
		if($("#foto_file").length > 0){
			$("#foto_file").fileinput({
				showUpload:false,
				previewFileType:'any',
				browseClass: "btn btn-sm btn-primary",
	        		browseLabel: "Cari Foto",
				removeClass: "btn btn-sm btn-danger",
	        		removeLabel: "Hapus",
				mainClass: "input-group-sm",
				showCaption: false
			});
		}

		//Date Time Picker
		if($(".datepick").length > 0){
			$('.datepick').datetimepicker({
				format: 'YYYY-MM-DD'
			});
		}

		// FORM pendidikan
		$('.btn-edit-pend').on('click',function(){
			var id = $(this).data('id');
			var url = $(this).data('url');
			$('button[type="submit"]').text('Simpan Perubahan');
			$.ajax({
  				method: "POST",
  				url: url,
  				data: { id: id }
			}).done(function( data ) {
				var obj = jQuery.parseJSON(data);
				$('input[name="act"]').val("edit");
				$('input[name="sekolah"]').val(obj.school_name);
				$('input[name="gelar"]').val(obj.title);
				$('input[name="tgl_mulai"]').val(obj.start_date);
				$('input[name="tgl_selesai"]').val(obj.end_date);
				$('input[name="id_members"]').val(obj.id_members);
				$('input[name="id_pendidikan"]').val(id);
				$('#form-container').slideDown('slow');
				$('#btn-add').addClass('collapse');
  			});
		});
		$('#mdl-pend-confirm').on('shown.bs.modal',function(event){
			var button = $(event.relatedTarget);
			var id = button.data('id');
			var url = button.data('url');
			var id_members = button.data('idmembers');
			console.log(id,url)
			$('.btn-del-pend').on('click',function(){
				console.log(id,url)
				$.ajax({
	  				method: "POST",
	  				url: url,
	  				data: { id: id, id_members:id_members }
				}).done(function( data ) {
					if(data > 0){
						$('#mdl-pend-confirm').modal('hide');
						$(location).attr('href',window.location.href);
					}
				});
			});
		});
		// FORM sertifikasi
		$('.btn-edit-sert').on('click',function(){
			var id = $(this).data('id');
			var url = $(this).data('url');
			$('button[type="submit"]').text('Simpan Perubahan');
			$.ajax({
  				method: "POST",
  				url: url,
  				data: { id: id }
			}).done(function( data ) {
				console.log(data);
				var obj = jQuery.parseJSON(data);
				$('input[name="act"]').val("edit");
				$('input[name="no_reg"]').val(obj.registration_number);
				$('input[name="no_sert"]').val(obj.certificate_number);
				$('input[name="bidang"]').val(obj.division_id);
				$('input[name="sub_bidang"]').val(obj.subdivision_id);
				$('input[name="unit_kompetensi"]').val(obj.competence_unit);
				$('input[name="level"]').val(obj.level);
				$('input[name="masa_berlaku"]').val(obj.validity_period);
				$('input[name="id_members"]').val(obj.id_members);
				$('input[name="id_sertifikat"]').val(id);
				$('#form-container').slideDown('slow');
				$('#btn-add').addClass('collapse');
  			});
		});
		$('#mdl-pel-confirm').on('shown.bs.modal',function(event){
			var button = $(event.relatedTarget);
			var id = button.data('id');
			var url = button.data('url');
			var id_members = button.data('idmembers');
			console.log(id,url)
			$('.btn-del-pel').on('click',function(){
				console.log(id,url)
				$.ajax({
	  				method: "POST",
	  				url: url,
	  				data: { id: id, id_members:id_members }
				}).done(function( data ) {
					if(data > 0){
						$('#mdl-pel-confirm').modal('hide');
						$(location).attr('href',window.location.href);
					}
				});
			});
		});
		// FORM pelatihan
		$('.btn-edit-pel').on('click',function(){
			var id = $(this).data('id');
			var url = $(this).data('url');
			$('button[type="submit"]').text('Simpan Perubahan');
			$.ajax({
  				method: "POST",
  				url: url,
  				data: { id: id }
			}).done(function( data ) {
				var obj = jQuery.parseJSON(data);
				$('input[name="act"]').val("edit");
				$('input[name="institusi"]').val(obj.institution_name);
				$('textarea[name="deskripsi"]').val(obj.description);
				$('input[name="tgl_mulai"]').val(obj.start_date);
				$('input[name="tgl_selesai"]').val(obj.end_date);
				$('input[name="id_members"]').val(obj.id_members);
				$('input[name="id_pelatihan"]').val(id);
				$('#form-container').slideDown('slow');
				$('#btn-add').addClass('collapse');
  			});
		});
		$('#mdl-pel-confirm').on('shown.bs.modal',function(event){
			var button = $(event.relatedTarget);
			var id = button.data('id');
			var url = button.data('url');
			var id_members = button.data('idmembers');
			console.log(id,url)
			$('.btn-del-pel').on('click',function(){
				console.log(id,url)
				$.ajax({
	  				method: "POST",
	  				url: url,
	  				data: { id: id, id_members:id_members }
				}).done(function( data ) {
					if(data > 0){
						$('#mdl-pel-confirm').modal('hide');
						$(location).attr('href',window.location.href);
					}
				});
			});
		});
		// FORM pekerjaan
		$('.btn-edit-exp').on('click',function(){
			var id = $(this).data('id');
			var url = $(this).data('url');
			$('button[type="submit"]').text('Simpan Perubahan');
			$.ajax({
  				method: "POST",
  				url: url,
  				data: { id: id }
			}).done(function( data ) {
				var obj = jQuery.parseJSON(data);
				$('input[name="act"]').val("edit");
				$('input[name="company_name"]').val(obj.company_name);
				$('input[name="specialis"]').val(obj.speciality);
				$('input[name="position"]').val(obj.position);
				$('input[name="tgl_mulai"]').val(obj.start_date);
				$('input[name="tgl_selesai"]').val(obj.end_date);
				$('input[name="id_members"]').val(obj.id_members);
				$('input[name="id_pengalaman"]').val(id);
				$('#form-container').slideDown('slow');
				$('#btn-add').addClass('collapse');
  			});
		});
		$('#mdl-pel-confirm').on('shown.bs.modal',function(event){
			var button = $(event.relatedTarget);
			var id = button.data('id');
			var url = button.data('url');
			var id_members = button.data('idmembers');
			console.log(id,url)
			$('.btn-del-pel').on('click',function(){
				console.log(id,url)
				$.ajax({
	  				method: "POST",
	  				url: url,
	  				data: { id: id, id_members:id_members }
				}).done(function( data ) {
					if(data > 0){
						$('#mdl-pel-confirm').modal('hide');
						$(location).attr('href',window.location.href);
					}
				});
			});
		});
	});

	$( '.centered' ).each(function( e ) {
		$(this).css('margin-top',  ($('#main-slider').height() - $(this).height())/2);
	});

	$(window).resize(function(){
		$( '.centered' ).each(function( e ) {
			$(this).css('margin-top',  ($('#main-slider').height() - $(this).height())/2);
		});
	});

	//portfolio
	$(window).load(function(){
		// $portfolio_selectors = $('.portfolio-filter >li>a');
		if($('.portfolio-filter').length > 0){
			$portfolio_selectors = $('.portfolio-filter >a');
			if($portfolio_selectors!='undefined'){
				$portfolio = $('.portfolio-items');
				$portfolio.isotope({
					itemSelector : 'li',
					layoutMode : 'fitRows'
				});
				$portfolio_selectors.on('click', function(){
					$portfolio_selectors.removeClass('active');
					$(this).addClass('active');
					var selector = $(this).attr('data-filter');
					$portfolio.isotope({ filter: selector });
					return false;
				});
			}
		}
	});

	//contact form
	var form = $('.contact-form');
	form.submit(function () {
		$this = $(this);
		$.post($(this).attr('action'), function(data) {
			$this.prev().text(data.message).fadeIn().delay(3000).fadeOut();
		},'json');
		return false;
	});

	//goto top
	$('.gototop').click(function(event) {
		event.preventDefault();
		$('html, body').animate({
			scrollTop: $("body").offset().top
		}, 500);
	});
});
