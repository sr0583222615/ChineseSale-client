import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input()
  openText: string = ''

  ngOnInit() {
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementById("close");

    if (btn) {
      // When the user clicks on the button, open the modal
      btn.onclick = function () {
        if (modal)
          modal.style.display = "block";
      }
    }

    if (span)
      // When the user clicks on <span> (x), close the modal
      span.onclick = function () {
        if (modal)
          modal.style.display = "none";
      }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event: any) {
      if (event.target == modal) {
        if (modal)
          modal.style.display = "none";
      }
    }
  }
}
