import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<any> {
  return queryInterface.bulkInsert('notification_templates', [
    {
      name: 'UPLOAD_DOCUMENT',
      emailContent: `<p>Hi {name}</p>
      <p>One of your clients has been uploaded a document into {doc_box_name}. By using below link you can view the document uploaded into the doc box
      <a href="{site}/doc/{docbox_id}">{site}/doc/{docbox_id}</a>`,
      emailSubject: `Document uploaded`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export function down(queryInterface: QueryInterface): Promise<any> {
  return queryInterface.bulkDelete('notification_templates', { name: 'UPLOAD_DOCUMENT' });
}
