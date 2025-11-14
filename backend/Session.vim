let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/Developer/farmora/backend
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
if &shortmess =~ 'A'
  set shortmess=aoOA
else
  set shortmess=aoO
endif
badd +23 app.js
badd +9 src/routes/userRoutes.js
badd +13 src/routes/authRouter.js
badd +69 src/controllers/authController.js
badd +92 src/services/authService.js
badd +15 src/controllers/subscriptionController.js
badd +13 src/services/subscriptionService.js
badd +3 src/services/paymentService.js
badd +35 src/models/user.js
badd +9 src/utils/db.js
badd +21 src/errors/subscription.errors.js
badd +12 src/errors/package.errors.js
badd +1 src/errors/payment.errors.js
badd +11 package.json
badd +12 jsconfig.json
badd +27 src/errors/user.errors.js
badd +10 src/validators/userValidator.js
badd +17 src/controllers/userController.js
badd +2359 node_modules/sequelize/types/model.d.ts
badd +16 src/routes/subscriptionRouter.js
badd +25 src/middlewares/authMiddleware.js
badd +8 src/validators/packageValidator.js
badd +3 src/middlewares/error-handler.js
badd +2 src/utils/async-handler.js
badd +9 seeders/20250208124437-super-admin.js
badd +3 migrations/20250208093431-create-user.js
badd +4 config/config.js
badd +1 migrations
argglobal
%argdel
$argadd app.js
edit src/controllers/authController.js
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd _ | wincmd |
split
1wincmd k
wincmd w
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe '1resize ' . ((&lines * 21 + 22) / 45)
exe 'vert 1resize ' . ((&columns * 83 + 83) / 167)
exe '2resize ' . ((&lines * 21 + 22) / 45)
exe 'vert 2resize ' . ((&columns * 83 + 83) / 167)
exe 'vert 3resize ' . ((&columns * 83 + 83) / 167)
argglobal
balt src/services/authService.js
setlocal foldmethod=manual
setlocal foldexpr=0
setlocal foldmarker={{{,}}}
setlocal foldignore=#
setlocal foldlevel=0
setlocal foldminlines=1
setlocal foldnestmax=20
setlocal foldenable
silent! normal! zE
let &fdl = &fdl
let s:l = 74 - ((18 * winheight(0) + 10) / 21)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 74
normal! 0
lcd ~/Developer/farmora/backend
wincmd w
argglobal
if bufexists(fnamemodify("~/Developer/farmora/backend/src/routes/subscriptionRouter.js", ":p")) | buffer ~/Developer/farmora/backend/src/routes/subscriptionRouter.js | else | edit ~/Developer/farmora/backend/src/routes/subscriptionRouter.js | endif
if &buftype ==# 'terminal'
  silent file ~/Developer/farmora/backend/src/routes/subscriptionRouter.js
endif
balt ~/Developer/farmora/backend/src/controllers/subscriptionController.js
setlocal foldmethod=manual
setlocal foldexpr=0
setlocal foldmarker={{{,}}}
setlocal foldignore=#
setlocal foldlevel=0
setlocal foldminlines=1
setlocal foldnestmax=20
setlocal foldenable
silent! normal! zE
let &fdl = &fdl
let s:l = 16 - ((11 * winheight(0) + 10) / 21)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 16
normal! 054|
lcd ~/Developer/farmora/backend
wincmd w
argglobal
if bufexists(fnamemodify("~/Developer/farmora/backend/src/services/subscriptionService.js", ":p")) | buffer ~/Developer/farmora/backend/src/services/subscriptionService.js | else | edit ~/Developer/farmora/backend/src/services/subscriptionService.js | endif
if &buftype ==# 'terminal'
  silent file ~/Developer/farmora/backend/src/services/subscriptionService.js
endif
balt ~/Developer/farmora/backend/src/controllers/authController.js
setlocal foldmethod=manual
setlocal foldexpr=0
setlocal foldmarker={{{,}}}
setlocal foldignore=#
setlocal foldlevel=0
setlocal foldminlines=1
setlocal foldnestmax=20
setlocal foldenable
silent! normal! zE
let &fdl = &fdl
let s:l = 28 - ((21 * winheight(0) + 21) / 43)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 28
normal! 027|
lcd ~/Developer/farmora/backend
wincmd w
3wincmd w
exe '1resize ' . ((&lines * 21 + 22) / 45)
exe 'vert 1resize ' . ((&columns * 83 + 83) / 167)
exe '2resize ' . ((&lines * 21 + 22) / 45)
exe 'vert 2resize ' . ((&columns * 83 + 83) / 167)
exe 'vert 3resize ' . ((&columns * 83 + 83) / 167)
tabnext 1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20
let &shortmess = s:shortmess_save
let &winminheight = s:save_winminheight
let &winminwidth = s:save_winminwidth
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
