import NotificationTemplate from '../../models/NotificationTemplate';
import User from '../../models/User';
import { replaceAll } from '../utils/utils';
import { FROM_EMAIL } from './config';
import { getTransport } from './smtp';

interface DateFormat {
  date: Date;
  format: (date: Date) => string;
}
export interface EmailReplaceMap {
  [key: string]: string | DateFormat | object;
}

function buildEmailFromTemplate(user: User, replace: EmailReplaceMap, emailContent: string): string {
  let emailHtml = replaceAll(emailContent, '{name}', user.first_name + user.last_name);
  emailHtml = replaceAll(emailHtml, '{email}', user.email);
  emailHtml = replaceAll(emailHtml, '{site}', process.env.WEBAPP_BASE_URL);
  return replaceTemplateContent(replace, emailHtml);
}

function replaceTemplateContent(replace: EmailReplaceMap, emailContent: string): string {
  let emailHtml = emailContent.toString();
  for (const [key, value] of Object.entries(replace)) {
    if (typeof value === 'string') {
      emailHtml = replaceAll(emailHtml, '{' + key + '}', value);
    } else {
      try {
        const decodedObject = JSON.parse(JSON.stringify(value));
        for (const [objKey, objValue] of Object.entries(decodedObject)) {
          // if (objValue) {
          emailHtml = replaceAll(emailHtml, '{' + key + '.' + objKey + '}', objValue?.toString() || '');
          // }
        }
      } catch (err) {
        console.log('email parse error', err);
        console.log('email parse error', key, value);
      }
    }
  }
  return emailHtml;
}

export const Notification = {
  async sendNotification(user: User, emailTemplate: NotificationTemplate, replace: EmailReplaceMap) {
    if (user.email) {
      await getTransport().sendMail({
        from: FROM_EMAIL,
        to: user.email,
        subject: buildEmailFromTemplate(user, replace, emailTemplate.emailSubject),
        html: buildEmailFromTemplate(user, replace, emailTemplate.emailContent),
      });
    }
  },
};
