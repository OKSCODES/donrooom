export const ADMIN_NAVIGATION = [
  ['Dashboard','dashboard'],['Profile','profile'],['Users','users'],['Property Owners','property-owners'],['Properties','properties'],['Property Approval','property-approval'],['Rooms','rooms'],['Bookings','bookings'],['Reviews','reviews'],['Gallery','gallery'],['Categories','categories'],['Locations','locations'],['Amenities','amenities'],['Reports','reports'],['Analytics','analytics'],['Notifications','notifications'],['Site Settings','site-settings'],['Security','security'],['Audit Logs','audit-logs'],['Monitoring','monitoring'],['Operations','operations'],['Backups','backups'],['Feedback','feedback'],
]

export const ADMIN_RESOURCES = {
  users:{collection:'users',title:'Users',search:['fullName','email','phone','role','status']},
  'property-owners':{collection:'users',title:'Property Owners',search:['fullName','email','phone'],filter:(row)=>row.role==='property'},
  properties:{collection:'properties',title:'Properties',search:['propertyName','village','status','propertyType']},
  'property-approval':{collection:'properties',title:'Property Approval',search:['propertyName','village','ownerName'],filter:(row)=>row.status==='pending'},
  rooms:{collection:'rooms',title:'Rooms',search:['roomName','roomNumber','roomType','status']},
  bookings:{collection:'bookings',title:'Bookings',search:['bookingNumber','guestName','propertyName','roomName','status']},
  reviews:{collection:'reviews',title:'Reviews',search:['propertyName','guestName','comment','status']},
  gallery:{collection:'propertyGallery',title:'Gallery',search:['category','propertyName']},
  categories:{collection:'categories',title:'Categories',search:['name','status']},
  locations:{collection:'locations',title:'Locations',search:['name','status']},
  amenities:{collection:'amenities',title:'Amenities',search:['name','status']},
  reports:{collection:'reports',title:'Reports',search:['type','status','subject']},
  notifications:{collection:'notifications',title:'Notifications',search:['title','message','audience']},
  'audit-logs':{collection:'auditLogs',title:'Audit Logs',search:['action','actorName','targetType','targetId']},
  feedback:{collection:'feedback',title:'User Feedback',search:['type','subject','message','status','email']},
}
