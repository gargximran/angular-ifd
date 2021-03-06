import { Component, OnInit } from '@angular/core';
import {AngularEditorConfig} from "@kolkov/angular-editor";
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {ApiService} from "../../service/api.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-privacy-and-policy',
  templateUrl: './privacy-and-policy.component.html',
  styleUrls: ['./privacy-and-policy.component.css']
})
export class PrivacyAndPolicyComponent implements OnInit {

  isAdmin = false;
  editMode = false;
  loading = false;
  htmlElements: any;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontSize: '',
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['undo', 'redo', "fontName"],
      ['link', 'unlink', 'insertImage', 'insertVideo', 'insertHorizontalRule', 'removeFormat', 'toggleEditorMode']
    ]
  };

  formG = new FormGroup({
    htmlContent: new FormControl("")
  })


  constructor(private auth: AuthService, private api: ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    window.scroll(0,0);
    this.isAdmin = this.auth.isAdmin();
    this.api.post('/utils/get/privacy_and_policy', {}).subscribe(
      res => {
        this.htmlElements = res.data;
        this.formG.patchValue({
          htmlContent: res.data
        })
      }
    )
  }

  submit(): void{
    this.loading = true;
    const form = new FormData();
    form.append('content', this.formG.get('htmlContent').value)
    this.api.post('/utils/update_privacy_and_policy', form).subscribe(
      res => {
        this.loading = false;
        this.editMode = false;
        this.toastr.success(res.message);
        this.ngOnInit();
      },
      err => {
        this.loading = false;
        this.toastr.error(err.message);
      }
    )
  }




}
