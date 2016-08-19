<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Member extends BackendController {
	
	protected $data = array();
	protected $cust_css = array(
		'assets/js/datatables/jquery.dataTables.min.css',
		'assets/js/datatables/buttons.bootstrap.min.css',
		'assets/js/datatables/fixedHeader.bootstrap.min.css',
		'assets/js/datatables/responsive.bootstrap.min.css',
		'assets/js/datatables/scroller.bootstrap.min.css',
		'assets/css/alertify/alertify.css',
	);

	protected $cust_js = array(
		'assets/js/alertify/alertify.js',
	);

	protected $jsonResponse;

	public function __construct(){
		parent::__construct();
	}


	public function index(){
		$this->load->helper('data_table_helper');
		set_page_title('Members ');
		set_css($this->cust_css);
		set_js($this->cust_js);
		set_js(get_datatables_js());
		set_js(get_customjs_path('member/member.js'));
		render_template('member_v');
	}

	public function get_member(){
		//ini_set('error_reporting', E_STRICT);
		$this->Crud_m->table = 'members';
		$cpData = $this->Crud_m->getDataTableV10();
        $this->Crud_m->outputToJson( $cpData );
	}


	public function approve(){

		$this->load->library('form_validation');
		$this->load->model('Member_m');
		$postData = $this->input->post();
		$this->form_validation->set_rules('member_id', 'ID', 'required|integer');
		if($this->form_validation->run() == FALSE){
			$this->jsonResponse['msg'] = validation_errors();
		}
		$approve = $this->Member_m->approve($postData['member_id']);
		if($approve == TRUE){
			$this->jsonResponse['msg'] = 'success';
		}
		else{
			$this->jsonResponse['msg'] = $approve;
		}
		echo json_encode($this->jsonResponse);
	}

	public function disapprove(){

		$this->load->library('form_validation');
		$this->load->model('Member_m');
		$postData = $this->input->post();
		$this->form_validation->set_rules('disapproved_member_id', 'ID', 'required|integer');
		if($this->form_validation->run() == FALSE){
			$this->jsonResponse['msg'] = validation_errors();
		}
		$disapprove = $this->Member_m->disapprove($postData['disapproved_member_id']);
		if($disapprove == TRUE){
			$this->jsonResponse['msg'] = 'success';
		}
		else{
			$this->jsonResponse['msg'] = $disapprove;
		}
		echo json_encode($this->jsonResponse);
	}


}