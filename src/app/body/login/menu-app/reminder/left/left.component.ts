import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ReminderService } from '../../../../../../core/services/reminder.service';
import { MyReminder } from '../../../../../../core/models/MyReminder';
import { hasLifecycleHook } from '@angular/compiler/src/lifecycle_reflector';

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.scss']
})
export class LeftComponent implements OnInit {

  // tslint:disable-next-line:no-inferrable-types
  editState: boolean = false;
  reminderEdit: MyReminder;
  reminders: MyReminder[];
  reminder: MyReminder = {
    title: '',
  };

  constructor(private reminderService: ReminderService) {
  }

  ngOnInit() {
    $('.toggle').click(function() {
      $('#target').toggle('fast');
    });

    this.reminderService.getReminders().subscribe(reminders => {
      this.reminders = reminders;
    });


  }
  addReminder() {
    if (this.reminder.title !== '') {
      this.reminderService.addReminder(this.reminder);
      this.reminder.title = '';
    }
    $('#target').hide(500);
  }

  deleteReminder(event, reminder: MyReminder) {
    this.reminderService.deleteReminder(reminder);
  }

  editReminder(event, reminder: MyReminder) {
    this.editState = true;
    this.reminderEdit = reminder;
  }

  updateReminder(reminder: MyReminder) {
    this.reminderService.updateReminder(reminder);
    $('.editinp').hide();
    this.editState = false;
  }

  // showfunc() {
  //   $(function() {
  //     $('.btnfunc').hover(function() {
  //           $('.targetDiv').hide();
  //       $('#div' + $(this).attr('target')).show();
  //     });
  //   });
  // }


  // Cái này nó kì lắm, Toàn đọc Comment đi
  change() {
    // Cái này dùng để đổi màu của <li> khi mình click
    const addclass = 'color';
      $('.divs').click(function(e) {
      e.preventDefault();
      $('.divs').removeClass(addclass);
      $(this).addClass(addclass);
    });
  }
  // Cái này nó ngộ vcl luôn ấy Toàn ơi, nếu Toàn để nó trong ngOninit ý thì nó sẽ ko catch đc các item của firebase,
  // vì...nó nằm trong ngOninit, nó chạy trước,còn các item trong firebase được load lên sau cái ngOninit, nên Toàn phải
  // đem nó ra ngoài hàm change() này và nhờ một thằng nào đó kích hoạt nó thì nó mới chạy sau khi load data firebase,
  // ngộ Toàn ha!!!
  // Đã thử thay .divs thành #divs nghĩa là đổi thành id thay cho class nhưng ko đc vì class dùng chung được, Id thì là DUY NHẤT

  hover() {
    // $(function() {
      $('.itemRight').hover(function() {
         $(this).find('.hidefunc').fadeToggle('medium');
      });
    // });
  }
  // Phần này cũng bị như change(), phải nhờ 1 thằng nào đó kích hoạt mới sử dụng được, ở đây mình nhờ phần Top của left, click
  // vào để kích hoạt hover cho button function.
}
