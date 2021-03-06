var table = $('#datatable-buttons').DataTable({
	serverSide: true,
    processing: true,
    autoWidth: false,
    scrollX: "100%",
    ajax: {
        url: 'user_certification/get_user_certification',
        type: 'POST'
    },
    columns: [
        {data: "#", orderable: false, searchable: false},
        {data: 'registration_number'},
        {data: 'certificate_number'},
        {data: 'division_id'},
        {data: 'subdivision_id'},
        {data: 'competence_unit'},
        {data: 'level'},
        {data: 'validity_period'},
        {data: 'id', render:function(data, type, row, meta){
        	$("body").data("R" + row.id, row);
        	return '<a title="Edit" href="#" class="btn btn-sm btn-warning" data-id="' + row.id + '"><i class="fa  fa-pencil"></i></a>';
        }},
        {data: 'id', visible: false, searchable: false, className: 'never'},
    ],
    order: [[1, 'asc']],
	dom: 'Bfrtip',
	buttons: [{
		extend: "csv",
		className: "btn-sm",
		text:'<i class="fa fa-file-text-o"></i>',
		titleAttr: 'CSV'
	}, {
		extend: "excel",
		className: "btn-sm",
		text:'<i class="fa fa-file-excel-o"></i>',
		titleAttr: 'Excel'
	}, {
		extend: "pdf",
		className: "btn-sm",
		text:'<i class="fa fa-file-pdf-o"></i>',
		titleAttr: 'PDF'
	}, {
		extend: "print",
		className: "btn-sm",
		text:'<i class="fa fa-print"></i>',
		titleAttr: 'Print'
	}]
});

$('#btn-add').click(function(){
	$('#form-container').slideDown("slow");
	//$(this).addClass('collapse');
});

$('#btnReset').click(function(){
	$('#form-container').slideUp("slow");
	$('#form-user-certification')[0].reset();
	$('#btn-add').removeClass('collapse');
	//remove value of input id
	$('#user-certification-id').val('');
});

$('#dtUserCertification').on('click', 'a[title~=Edit]', function (e){
    e.preventDefault();
    var id = $(this).attr('data-id');
    var d = $("body").data("R" + id);
    $('#user-certification-id').val(d.id);
    $('#registration_number').val(d.registration_number);
    $('#certificate_number').val(d.certificate_number);
    $('#division_id').val(d.division_id);
    $('#subdivision_id').val(d.subdivision_id);
    $('#competence_unit').val(d.competence_unit);
    $('#level').val(d.level);
    $('#validity_period').val(d.validity_period);
    $('#form-container').slideDown('slow');
    
});

/*function edit_form(){
	$('#form-container').slideDown('slow');
	console.log($(this));
	//$('#btn-add').addClass('collapse');
}*/


$('#form-user-certification').on('submit', function(event){
	event.preventDefault();
	if($('#user-certification-id').val() != ''){
		//--- Edit Mode
		var id = $('#user-certification-id').val();
	    $.post('user_certification/update_user_certification', $("#form-user-certification").serialize()+ "&id=" + id, function (obj) {
	        if (obj.msg == 'success') {
	            alertify.success("Update Data Success");
	            $('#form-user-certification')[0].reset();
				$('#form-container').slideUp('slow');
	            $('#dtUserCertification .table').DataTable().ajax.reload();
	            //remove value of input id
	            $('#user-certification-id').val('');
	        }else{
	            alertifyError(obj.msg);

	        }
	    }, "json").fail(function () {
	        alertifyError();
	    });
	}	
	else{
		//--- Insert
	    $.post('user_certification/save_user_certification', $("#form-user-certification").serialize(), function (obj) {
	        if (obj.msg == 'success') {
	            alertify.success("Insert Data Success");
	            $('#form-user-certification')[0].reset();
				$('#form-container').slideUp('slow');
	            $('#dtUserCertification .table').DataTable().ajax.reload();
	            //remove value of input id
	            $('#user-certification-id').val();
	            
	        } else {
	            alertifyError(obj.msg);

	        }
	    }, "json").fail(function () {
	        alertifyError();
	    });
	}
	
	return false;
});


$('#validity_period').daterangepicker({
	"singleDatePicker": true,
	"showDropdowns": true

});
