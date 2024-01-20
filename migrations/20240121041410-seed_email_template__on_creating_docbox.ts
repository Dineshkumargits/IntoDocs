import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<any> {
  return queryInterface.bulkInsert('notification_templates', [
    {
      name: 'ADD_DOC_BOX',
      emailContent: `<p>Hi {name}</p>
      <p>IntoDocs admin created a DocBox named {doc_box_name} and gave access to you. You can start uploading your documents by clicking below link</p>
      <a href="{site}/doc/{docbox_id}">{site}/doc/{docbox_id}</a>`,
      emailSubject: `Doc Box created!`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export function down(queryInterface: QueryInterface): Promise<any> {
  return queryInterface.bulkDelete('notification_templates', { name: 'ADD_DOC_BOX' });
}
